import { Stack } from '@mui/system';
import React from 'react';
import theme from '../../theme/theme';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';

interface CvsHeader {
  cv: string;
}

const CvsHeader: React.FC<CvsHeader> = ({ cv }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 300,
        color: theme.palette.text.disabled,
      }}
    >
      <Button
        sx={{
          textTransform: 'capitalize',
        }}
        onClick={() => navigate(AppRoutes.Cvs.Path)}
      >
        {t('cv')}
      </Button>
      <KeyboardArrowRightIcon />
      <Button
        sx={{
          textTransform: 'capitalize',
          color: theme.palette.text.secondary,
        }}
      >
        {cv || ''}
      </Button>
    </Stack>
  );
};

export default CvsHeader;
