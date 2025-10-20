import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';

interface AuthHeaderProps {
  active: 'login' | 'signup';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ active }) => {
  const { t } = useTranslation('authorisation');
  const navigate = useNavigate();

  return (
    <ButtonGroup
      variant="text"
      sx={{
        width: '100%',
        justifyContent: 'center',
        gap: 2,
        '& .MuiButton-root': {
          width: 200,
          fontSize: 18,
          textTransform: 'uppercase',
          paddingY: '15px',
          transition: '0.4s ease',
          background: 'transparent',
          '&:hover': {
            background: 'rgba(128, 128, 128, 0.144)',
          },
          '&:active': {
            background: 'rgba(91, 91, 91, 0.144)',
          },
        },
      }}
    >
      <Button
        onClick={() => navigate(AppRoutes.LOGIN)}
        sx={{
          color: active === 'login' ? 'red' : 'white',
          borderBottom: active === 'login' ? '2px solid red' : 'none',
          borderRadius: 0,
        }}
      >
        {t('login')}
      </Button>

      <Button
        onClick={() => navigate(AppRoutes.REGISTRATION)}
        sx={{
          color: active === 'signup' ? 'red' : 'white',
          borderBottom: active === 'signup' ? '2px solid red' : 'none',
          borderRadius: 0,
        }}
      >
        {t('signup')}
      </Button>
    </ButtonGroup>
  );
};

export default AuthHeader;
