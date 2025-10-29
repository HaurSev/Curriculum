import { Button, Stack } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface HeaderProps {
  full_name: string;
}

const Header: React.FC<HeaderProps> = ({ full_name }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 300,
        color: theme.palette.text.disabled,
      }}
    >
      <Button
        sx={{
          textTransform: 'capitalize',
        }}
        onClick={() => navigate(AppRoutes.USERS)}
      >
        {t('employee')}
      </Button>
      <KeyboardArrowRightIcon />
      <Button
        sx={{
          textTransform: 'capitalize',
          color: theme.palette.text.secondary,
        }}
      >
        <PersonOutlineOutlinedIcon />
        {full_name || t('username')}
      </Button>
    </Stack>
  );
};

export default Header;
