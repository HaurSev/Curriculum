import React from 'react';
import theme from '../../theme/theme';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import { Container } from './style';

interface CvsHeader {
  cv: string;
}

const CvsHeader: React.FC<CvsHeader> = ({ cv }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  return (
    <Container>
      <Button onClick={() => navigate(AppRoutes.Cvs.Path)}>{t('cv')}</Button>
      <KeyboardArrowRightIcon />
      <Button style={{ color: theme.palette.text.secondary }}>
        {cv || ''}
      </Button>
    </Container>
  );
};

export default CvsHeader;
