import { Box, Button, Stack, styled } from '@mui/material';

export const FormContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 800,
}));

export const FormStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
}));

export const FormFieldsStack = styled(FormStack)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const ButtonStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
}));

export const SubmitButton = styled(Button)(() => ({
  type: 'submit',
  color: 'primary',
  width: 'fit-content',
}));
