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

interface HeaderProps {
  full_name: string;
}

const Header: React.FC<HeaderProps> = ({ full_name }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <HeaderContainer>
      <NavigationButton onClick={() => navigate(AppRoutes.Users.Path)}>
        {t('employee')}
      </NavigationButton>
      <ArrowIcon />
      <UserButton>
        <PersonIcon />
        {full_name || t('username')}
      </UserButton>
    </HeaderContainer>
  );
};

export default Header;
