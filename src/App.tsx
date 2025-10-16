import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import { client } from './apollo/apollo.tsx';
import { ApolloProvider } from '@apollo/client/react';
import useTestStore from './store/testStore.ts';
import './i18n.ts';

function App() {
  const { count, increment, reset } = useTestStore();

  const { t, i18n } = useTranslation('common');

  const handleChangeLanguage = () => {
    const newLanguage = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={increment}>count is {count}</button>
        <button onClick={reset}>reset</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={handleChangeLanguage}>translate</button>
      <p>{t('one')}</p>
    </ApolloProvider>
  );
}

export default App;
