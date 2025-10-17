import './App.css';
import { client } from './apollo/apollo.tsx';
import { ApolloProvider } from '@apollo/client/react';
import './i18n.ts';
import router from './router/index.tsx';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
