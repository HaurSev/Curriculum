import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { ActiveButton, AuthHeaderButtonGroup, DefButton } from './style';
import type { AuthHeaderProps } from './type';

const AuthHeader: React.FC<AuthHeaderProps> = ({ active }) => {
  const { t } = useTranslation('authorisation');
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate(AppRoutes.Login);
  };

  const handleRegistrationNavigate = () => {
    navigate(AppRoutes.Login);
  };

  return active === 'login' ? (
    <AuthHeaderButtonGroup>
      <ActiveButton variant="outlined" onClick={handleLoginNavigate}>
        {t('login')}
      </ActiveButton>
      <DefButton variant="outlined" onClick={handleRegistrationNavigate}>
        {t('signup')}
      </DefButton>
    </AuthHeaderButtonGroup>
  ) : (
    <AuthHeaderButtonGroup>
      <DefButton variant="outlined" onClick={handleLoginNavigate}>
        {t('login')}
      </DefButton>
      <ActiveButton variant="outlined" onClick={handleRegistrationNavigate}>
        {t('signup')}
      </ActiveButton>
    </AuthHeaderButtonGroup>
  );
};

export default AuthHeader;
