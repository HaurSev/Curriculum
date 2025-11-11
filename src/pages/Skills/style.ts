import { Box, Button, Typography, styled } from '@mui/material';

export const PageTitle = styled(Typography)(({ theme }) => ({
  variant: 'body1',
  color: theme.palette.text.disabled,
}));

export const HeaderContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(5),
}));

export const AddSkillButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(3),
  color: theme.palette.text.secondary,
}));
