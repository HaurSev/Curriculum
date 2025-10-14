import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { client } from './apollo/apollo.tsx';
import { ApolloProvider } from '@apollo/client/react';

const root = createRoot(document.getElementById('root')!);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
