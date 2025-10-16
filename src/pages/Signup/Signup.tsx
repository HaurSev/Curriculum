import React from 'react';
import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SignupForm from '../../modules/SignupForm/SignupForm';

const Signup = () => {
  const { t } = useTranslation('authorisation');

  return (
    <div className="loginPage">
      <AuthHeader active="signup" />
      <div className="welcomePart">
        <h1>{t('register_now')}</h1>
        <p>{t('welcome_signup')}</p>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
