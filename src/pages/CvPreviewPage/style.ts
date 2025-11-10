import { Button, Stack, styled, Typography } from '@mui/material';
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

export const PositionText = styled(Typography)(({ theme }) => ({
  variant: 'h6',
  textTransform: 'uppercase',
  letterSpacing: theme.spacing(1),
}));

export const ExportButton = styled(Button)(({ theme }) => ({
  variant: 'outlined',
  color: theme.palette.text.secondary,
  borderColor: theme.palette.text.secondary,
}));

export const SectionTitle = styled(Typography)(() => ({
  variant: 'h5',
  fontWeight: 700,
}));

export const DescriptionText = styled(Typography)(() => ({
  variant: 'body1',
}));
