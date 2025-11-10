import { Avatar, List, Stack, styled, Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MovingIcon from '@mui/icons-material/Moving';
import PortraitIcon from '@mui/icons-material/Portrait';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const StyledList = styled(List)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(3),
  marginBottom: '0',
}));

export const UserStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(5),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  bgcolor: theme.palette.primary.main,
  width: '40px',
  height: '40px',
}));

export const BackIcon = styled(ArrowBackIosNewIcon)(({ theme }) => ({
  cursor: 'pointer',
  height: theme.spacing(5),
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledGroupIcon = styled(GroupIcon, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledMovingIcon = styled(MovingIcon, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledGTranslateIcon = styled(GTranslateIcon, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));

export const StyledPortraitIcon = styled(PortraitIcon, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
}));
