import { Box, Paper, Stack, styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',
  zIndex: 100,
  background: 'rgba(0,0,0,0.8)',
  position: 'absolute',
  left: 0,
  top: 0,
}));

export const Form = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 800,
  width: '80%',
  padding: theme.spacing(10),
  paddingTop: theme.spacing(4),
  opacity: 0.8,
}));

export const FormHeader = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
}));

export const FormBody = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  gap: theme.spacing(5),
  paddingTop: theme.spacing(2),
}));

export const ClearIconHover = styled(ClearIcon)(() => ({
  ':hover': {
    cursor: 'pointer',
  },
}));

export const ButtonStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
}));
