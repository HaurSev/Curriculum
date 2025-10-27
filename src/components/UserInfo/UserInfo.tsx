import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../theme/theme';
import moment from 'moment';

interface UserInfoProps {
  full_name: string;
  email: string;
  created_at: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  full_name,
  email,
  created_at,
}) => {
  const [t] = useTranslation(['common', 'users']);
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(2),
      }}
    >
      <Typography variant="h3">{full_name || t('username')}</Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.disabled,
          textTransform: 'lowercase',
        }}
      >
        {email || t('email')}
      </Typography>
      <Typography variant="body1">
        {t('users:aMemberSince') || t('notFound')}
        {moment(parseInt(created_at || '')).format(' ddd MMMM D YYYY')}
      </Typography>
    </Stack>
  );
};

export default UserInfo;
