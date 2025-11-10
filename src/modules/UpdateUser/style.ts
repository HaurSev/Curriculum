import {
  Box,
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
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
  alignItems: 'flex-end',
  width: '100%',
  gap: theme.spacing(5),
  paddingTop: theme.spacing(2),
}));

export const CloseIcon = styled(ClearIcon)(() => ({
  ':hover': {
    cursor: 'pointer',
  },
}));

export const ButtonStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: theme.spacing(5),
}));

export const FormTitle = styled(Typography)(() => ({
  variant: 'h6',
  textTransform: 'capitalize',
}));

export const CloseButton = styled(CloseIcon)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

export const FormColumn = styled(Stack)(() => ({
  spacing: 5,
  width: '50%',
}));

export const StyledTextField = styled(TextField)(() => ({}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  width: '100%',
}));

export const CancelButton = styled(Button)(() => ({
  variant: 'contained',
  size: 'large',
  width: '45%',
}));

export const SubmitButton = styled(Button)(() => ({
  variant: 'outlined',
  size: 'large',
  width: '45%',
  type: 'submit',
}));
