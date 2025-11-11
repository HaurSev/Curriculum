import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    sessionStorage.setItem('i18nextLng', newLang);
  };

  return (
    <Button variant="outlined" onClick={toggleLanguage}>
      {i18n.language === 'en' ? 'EN' : 'RU'}
    </Button>
  );
};

export default LanguageSwitcher;
