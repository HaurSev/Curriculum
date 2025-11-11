import { Box, styled } from '@mui/material';

export const AvatarContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: theme.spacing(20),
  padding: theme.spacing(5),
}));

export const UploadBlock = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const HiddenInput = styled('input')({
  display: 'none',
});
