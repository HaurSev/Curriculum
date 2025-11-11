import { Box, Button, Typography, styled } from '@mui/material';

export const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

export const HeaderContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
}));

export const AddCvButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(3),
  color: theme.palette.text.secondary,
}));
