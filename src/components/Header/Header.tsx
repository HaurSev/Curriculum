import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import {
  HeaderContainer,
  NavigationButton,
  UserButton,
  ArrowIcon,
  PersonIcon,
} from './style';
import type { HeaderProps } from './type';

const Header: React.FC<HeaderProps> = ({ fullName }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleNavigate = () => {
    navigate(AppRoutes.Users.Path);
  };

  return (
    <HeaderContainer>
      <NavigationButton onClick={handleNavigate}>
        {t('employee')}
      </NavigationButton>
      <ArrowIcon />
      <UserButton>
        <PersonIcon />
        {fullName || t('username')}
      </UserButton>
    </HeaderContainer>
  );
};

export default Header;
