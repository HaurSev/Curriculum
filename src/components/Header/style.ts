import { Button, Stack, styled } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export const HeaderContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontWeight: 300,
  color: theme.palette.text.disabled,
}));

export const NavigationButton = styled(Button)(() => ({
  textTransform: 'capitalize',
}));

export const UserButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

export const ArrowIcon = styled(KeyboardArrowRightIcon)({});
export const PersonIcon = styled(PersonOutlineOutlinedIcon)({});
