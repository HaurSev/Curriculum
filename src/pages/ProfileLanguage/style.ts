import { Button, Stack, styled } from '@mui/material';

export const ButtonStack = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const AddLanguageButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const DeleteLanguageButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const ActiveDeleteButton = styled(DeleteLanguageButton)(() => ({
  variant: 'contained',
}));

export const InactiveDeleteButton = styled(DeleteLanguageButton)(
  ({ theme }) => ({
    color: theme.palette.text.secondary,
  }),
);
