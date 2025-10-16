import React from 'react';
import { useTranslation } from 'react-i18next';
import './AuthHeader.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';

interface AuthHeaderProps {
  active: 'login' | 'signup';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ active }) => {
  const { t } = useTranslation('authorisation');

  const navigate = useNavigate();

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
        onClick={() => navigate(AppRoutes.LOGIN)}
        className={logClassList.length === 0 ? '' : logClassList.join(' ')}
      >
        {t('login')}
      </button>
      <button
        onClick={() => navigate(AppRoutes.REGISTRATION)}
        className={signClassList.length === 0 ? '' : signClassList.join(' ')}
      >
        {t('signup')}
      </button>
    </div>
  );
};

export default AuthHeader;
