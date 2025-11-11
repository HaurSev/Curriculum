import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  fromPromise,
  gql,
} from '@apollo/client';
import { getRefreshToken, getAccessToken, saveTokens } from './authStorage';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { clearTokensAndLogout } from './authServise';
import { AuthError } from './apollo.type';

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

const createRefreshClient = () => {
  const refreshAuthLink = setContext((_, { headers }) => {
    const refreshToken = getRefreshToken();
    return {
      headers: {
        ...headers,
        Authorization: refreshToken ? `Bearer ${refreshToken}` : '',
      },
    };
  });

  const refreshHttpLink = new HttpLink({ uri: API_URL });

  return new ApolloClient({
    link: ApolloLink.from([refreshAuthLink, refreshHttpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { errorPolicy: 'all' },
      mutate: { errorPolicy: 'all' },
    },
  });
};

const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshTokenValue = getRefreshToken();

    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    const refreshClient = createRefreshClient();

    const response = await refreshClient.mutate({
      mutation: gql`
        mutation UpdateToken {
          updateToken {
            access_token
            refresh_token
          }
        }
      `,
    });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (!response.data?.updateToken) {
      throw new Error('No data received from updateToken mutation');
    }

    const { access_token, refresh_token } = response.data.updateToken;

    if (!access_token || !refresh_token) {
      throw new Error('Invalid tokens received');
    }

    saveTokens(access_token, refresh_token);
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokensAndLogout();
    return false;
  }
};

const authLink = setContext((operation, { headers }) => {
  const isUpdateToken = operation.operationName === 'UpdateToken';
  const token = isUpdateToken ? getRefreshToken() : getAccessToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.error(`[GraphQL error]: ${error.message}`, error);

        if (
          error.message === AuthError.Unauthorized ||
          error.message === AuthError.InvalidToken ||
          error.message.includes(AuthError.Expired) ||
          error.extensions?.code === AuthError.Unauthenticated
        ) {
          if (operation.operationName === 'UpdateToken') {
            clearTokensAndLogout();
            return;
          }

          if (isRefreshing) {
            return fromPromise(
              new Promise<void>((resolve) => {
                pendingRequests.push(() => resolve());
              }),
            ).flatMap(() => forward(operation));
          }

          isRefreshing = true;

          return fromPromise(
            refreshToken()
              .then((success) => {
                if (!success) {
                  clearTokensAndLogout();
                  throw new Error('Token refresh failed');
                }
                resolvePendingRequests();
                return success;
              })
              .catch((error) => {
                pendingRequests = [];
                clearTokensAndLogout();
                throw error;
              })
              .finally(() => {
                isRefreshing = false;
              }),
          ).flatMap(() => forward(operation));
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);

      if ('statusCode' in networkError && networkError.statusCode === 401) {
        clearTokensAndLogout();
      }
    }
  },
);

const httpLink = new HttpLink({
  uri: API_URL,
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
