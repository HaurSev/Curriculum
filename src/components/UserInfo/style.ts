import { Stack, Typography, styled } from '@mui/material';

export const InfoContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const UserName = styled(Typography)(() => ({
  variant: 'h3',
}));

export const UserEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  textTransform: 'lowercase',
  variant: 'body1',
}));

export const MemberSince = styled(Typography)(() => ({
  variant: 'body1',
}));
