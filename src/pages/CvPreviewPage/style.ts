import { Stack, styled } from '@mui/material';
import theme from '../../theme/theme';

export const InfoBlock = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '80%',
  justifyContent: 'space-between',
  gap: theme.spacing(10),
}));

export const SmallBlock = styled(Stack)(() => ({
  display: 'flex',
  gap: theme.spacing(5),
  width: '30%',
  padding: theme.spacing(5),
}));

export const LargeBlock = styled(SmallBlock)(() => ({
  width: '70%',
  borderLeft: `2px solid ${theme.palette.text.secondary}`,
}));
