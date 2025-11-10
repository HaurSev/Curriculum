import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { ActiveButton, AuthHeaderButtonGroup, DefButton } from './style';

interface AuthHeaderProps {
  active: 'login' | 'signup';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ active }) => {
  const { t } = useTranslation('authorisation');
  const navigate = useNavigate();

  return active === 'login' ? (
    <AuthHeaderButtonGroup>
      <ActiveButton
        variant="outlined"
        onClick={() => navigate(AppRoutes.Login)}
      >
        {t('login')}
      </ActiveButton>
      <DefButton
        variant="outlined"
        onClick={() => navigate(AppRoutes.Registration)}
      >
        {t('signup')}
      </DefButton>
    </AuthHeaderButtonGroup>
  ) : (
    <AuthHeaderButtonGroup>
      <DefButton variant="outlined" onClick={() => navigate(AppRoutes.Login)}>
        {t('login')}
      </DefButton>
      <ActiveButton
        variant="outlined"
        onClick={() => navigate(AppRoutes.Registration)}
      >
        {t('signup')}
      </ActiveButton>
    </AuthHeaderButtonGroup>
  );
};

export default AuthHeader;
