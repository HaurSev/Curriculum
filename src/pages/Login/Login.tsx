import AuthHeader from '../../components/AuthHeader/AuthHeader';
import LoginForm from '../../modules/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import './Login.css';

const Login = () => {
  const { t } = useTranslation('authorisation');

  return (
    <div className="loginPage">
      <AuthHeader active="login" />
      <div className="welcomePart">
        <h1>{t('welcome')}</h1>
        <p>{t('helloAgain')}</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
