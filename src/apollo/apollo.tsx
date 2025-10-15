import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';

const API_URL = import.meta.env.VITE_API_URL;

const httpLink = new HttpLink({
  uri: API_URL,
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions,
        )}`,
      ),
    );
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
