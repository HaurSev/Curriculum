import { Stack, styled } from '@mui/material';

export const FormBody = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  gap: theme.spacing(10),
  paddingTop: theme.spacing(5),
}));
