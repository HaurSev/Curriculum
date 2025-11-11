import { Box, Typography, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '90%',
  justifyContent: 'flex-start',
  padding: theme.spacing(5),
  gap: '25%',
  flexWrap: 'wrap',
}));

export const Block = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
  cursor: 'pointer',
  marginBottom: theme.spacing(5),
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
}));

export const CheckedBlock = styled(Block)(({ theme }) => ({
  background: 'rgba(107, 36, 36, 0.21)',
  borderRadius: theme.spacing(10),
  boxShadow: `5px 3px rgba(33, 29, 29, 0.32)`,
}));

export const LanguageName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  variant: 'body1',
}));

export const ProficiencyText = styled(Typography)(() => ({
  variant: 'h6',
}));
