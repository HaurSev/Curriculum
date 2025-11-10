import { Stack, styled } from '@mui/material';

export const Container = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontWeight: 300,
  color: theme.palette.text.disabled,
  textTransform: 'capitalize',
}));
