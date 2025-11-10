import { Box, Stack, styled } from '@mui/material';
import theme from '../../theme/theme';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '80%',
  gap: theme.spacing(4),
}));

export const CategoryBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
}));

export const SkillsRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  gap: '10%',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

export const Content = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(7),
  padding: theme.spacing(3),
  cursor: 'pointer',
  height: theme.spacing(10),
  marginBottom: theme.spacing(3),
  transition: '0.3s ease',
}));

export const CheckedContent = styled(Content)(() => ({
  background: 'rgba(107, 36, 36, 0.21)',
  borderRadius: theme.spacing(10),
  boxShadow: `5px 3px rgba(33, 29, 29, 0.32)`,
}));
