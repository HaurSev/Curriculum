import { Box, Button, styled } from '@mui/material';
import theme from '../../theme/theme';

export const SerachBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(5),
  marginTop: theme.spacing(3),
}));

export const AddProjectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
