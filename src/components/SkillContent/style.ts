import { Box, Stack, Typography, styled } from '@mui/material';

export const Block = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  gap: '10%',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

export const Content = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(7),
  padding: theme.spacing(5),
  cursor: 'pointer',
  height: theme.spacing(4),
  marginBottom: theme.spacing(5),
  transition: '0.8s ease',
}));

export const CheckedContent = styled(Content)(({ theme }) => ({
  background: 'rgba(107, 36, 36, 0.21)',
  borderRadius: theme.spacing(10),
  boxShadow: `5px 3px rgba(33, 29, 29, 0.32)`,
}));

export const SkillText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 15,
  variant: 'body1',
}));
