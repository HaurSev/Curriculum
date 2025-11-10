import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import type { SideBarProps } from './type';
import {
  StyledList,
  Container,
  UserStack,
  UserAvatar,
  BackIcon,
  StyledGroupIcon,
  StyledMovingIcon,
  StyledGTranslateIcon,
  StyledPortraitIcon,
} from './style';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
const SideBar: React.FC<SideBarProps> = ({ active = 'employees' }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const userData = JSON.parse(sessionStorage.getItem('user') || '');

  return (
    <StyledList>
      <Container>
        <ListItemButton
          onClick={() => navigate(AppRoutes.Users.Path)}
          className={active === 'employees' ? 'active' : ''}
        >
          <ListItemIcon>
            <StyledGroupIcon isActive={active === 'employees'} />
          </ListItemIcon>
          <ListItemText primary={t('employees')} />
        </ListItemButton>
        <ListItemButton
          className={active === 'skills' ? 'active' : ''}
          onClick={() => navigate(AppRoutes.Skills)}
        >
          <ListItemIcon>
            <StyledMovingIcon isActive={active === 'skills'} />
          </ListItemIcon>
          <ListItemText primary={t('skills')} />
        </ListItemButton>
        <ListItemButton
          className={active === 'language' ? 'active' : ''}
          onClick={() => navigate(AppRoutes.Languages)}
        >
          <ListItemIcon>
            <StyledGTranslateIcon isActive={active === 'language'} />
          </ListItemIcon>
          <ListItemText primary={t('language')} />
        </ListItemButton>
        <ListItemButton
          className={active === 'cv' ? 'active' : ''}
          onClick={() => navigate(AppRoutes.Cvs.Path)}
        >
          <ListItemIcon>
            <StyledPortraitIcon isActive={active === 'cv'} />
          </ListItemIcon>
          <ListItemText primary={t('cv')} />
        </ListItemButton>
      </Container>

      <Container>
        <LanguageSwitcher />
        <UserStack>
          <BackIcon
            onClick={() =>
              navigate(AppRoutes.Users.Children.Profile.Create(userData.id))
            }
          />
          {userData.avatar ? (
            <UserAvatar src={userData.avatar} />
          ) : (
            <UserAvatar>{userData.full_name?.[0] ?? ''}</UserAvatar>
          )}
          <Typography>{userData.full_name}</Typography>
        </UserStack>
      </Container>
    </StyledList>
  );
};

export default SideBar;
