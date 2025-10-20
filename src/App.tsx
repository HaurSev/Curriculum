import { client } from './apollo/apollo.tsx';
import { ApolloProvider } from '@apollo/client/react';
import './i18n.ts';
import router from './router/index.tsx';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme, { globalStyles } from './theme/theme.tsx';
import { GlobalStyles } from '@mui/material';

function App() {
  console.log('App rendered');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
