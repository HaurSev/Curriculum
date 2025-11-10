import { Button, ButtonGroup, styled } from '@mui/material';

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  gap: theme.spacing(2),
  '& .MuiButton-root': {
    width: 180,
    fontSize: 14,
    padding: `${theme.spacing(4)} 0`,
  },
}));

export const ProfileButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.secondary : theme.palette.text.disabled,
  borderBottom: isActive ? `2px solid ${theme.palette.text.secondary}` : 'none',
  borderRadius: 0,
  '&:hover': {
    color: theme.palette.text.secondary,
    borderBottom: `2px solid ${theme.palette.text.secondary}`,
  },
}));
