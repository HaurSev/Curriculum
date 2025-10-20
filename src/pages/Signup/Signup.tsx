import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SignupForm from '../../modules/SignupForm/SignupForm';
import '../Login/Login.css';

const Signup = () => {
  const { t } = useTranslation('authorisation');

  return (
    <div className="loginPage">
      <AuthHeader active="signup" />
      <div className="welcomePart">
        <h1>{t('registerNow')}</h1>
        <p>{t('welcomeSignup')}</p>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
