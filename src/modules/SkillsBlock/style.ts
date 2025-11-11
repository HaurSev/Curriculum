import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '80%',
}));

export const Block = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1),
}));
