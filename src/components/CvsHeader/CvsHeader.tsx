import React from 'react';
import theme from '../../theme/theme';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import { Container } from './style';
import { type CvsHeaderProps } from './type';

const CvsHeader: React.FC<CvsHeaderProps> = ({ cv }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(AppRoutes.Cvs.Path);
  };
  const [t] = useTranslation();
  return (
    <Container>
      <Button onClick={handleNavigate}>{t('cv')}</Button>
      <KeyboardArrowRightIcon />
      <Button style={{ color: theme.palette.text.secondary }}>
        {cv || ''}
      </Button>
    </Container>
  );
};

export default CvsHeader;
