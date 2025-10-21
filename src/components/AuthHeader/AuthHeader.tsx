import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import theme from '../../theme/theme';

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
          paddingY: theme.spacing(4),
        },
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(AppRoutes.LOGIN)}
        sx={{
          color:
            active === 'login'
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          borderBottom:
            active === 'login'
              ? `2px solid ${theme.palette.text.secondary}`
              : 'none',

          borderRadius: 0,
        }}
      >
        {t('login')}
      </Button>

      <Button
        variant="outlined"
        onClick={() => navigate(AppRoutes.REGISTRATION)}
        sx={{
          color:
            active === 'signup'
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          borderBottom:
            active === 'signup'
              ? `2px solid ${theme.palette.text.secondary}`
              : 'none',
          borderRadius: 0,
        }}
      >
        {t('signup')}
      </Button>
    </ButtonGroup>
  );
};

export default AuthHeader;
