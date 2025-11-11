import { Button, Stack, styled } from '@mui/material';

export const ButtonStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(3),
}));

export const AddSkillButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const DeleteSkillButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const ActiveDeleteButton = styled(DeleteSkillButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  variant: 'contained',
}));

export const InactiveDeleteButton = styled(DeleteSkillButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
