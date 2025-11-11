import { Button, ButtonGroup, styled } from '@mui/material';

export const AuthHeaderButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  gap: 2,
  '& .MuiButton-root': {
    width: 200,
    fontSize: 18,
    paddingY: theme.spacing(4),
  },
}));

export const ActiveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderBottom: `2px solid ${theme.palette.text.secondary}`,
  borderRadius: 0,
}));

export const DefButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.disabled,
  borderBottom: `none`,
  borderRadius: 0,
}));
