import { Stack, styled } from '@mui/material';

export const FormBody = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  gap: theme.spacing(10),
  paddingTop: theme.spacing(5),
}));

export const ButtonStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: theme.spacing(5),
}));
