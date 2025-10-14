import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://cv-project-js.inno.ws/api/graphql' }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);