import React from 'react';
import { useTranslation } from 'react-i18next';
import './AuthHeader.css';

interface AuthHeaderProps {
  active: 'login' | 'signup';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ active }) => {
  const { t } = useTranslation('authorisation');

  const logClassList = [];
  const signClassList = [];

  if (active === 'login') {
    logClassList.push('active');
  } else {
    signClassList.push('active');
  }
  return (
    <div className="authHeader">
      <button
        className={logClassList.length === 0 ? '' : logClassList.join(' ')}
      >
        {t('login')}
      </button>
      <button
        className={signClassList.length === 0 ? '' : signClassList.join(' ')}
      >
        {t('signup')}
      </button>
    </div>
  );
};

export default AuthHeader;
