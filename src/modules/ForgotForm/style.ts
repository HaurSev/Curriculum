import { Box, Button, Paper, Stack, styled } from '@mui/material';

export const BoxForm = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
}));

export const FormPaper = styled(Paper)(() => ({
  width: '100%',
  maxWidth: 600,
}));

export const FormStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5),
  width: '600px',
  gap: theme.spacing(1),
  background: 'transparent',
}));

export const FormButton = styled(Button)(() => ({
  height: 45,
  width: 210,
}));
