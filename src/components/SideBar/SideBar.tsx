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

  const handleUsersNavigate = () => {
    navigate(AppRoutes.Users.Path);
  };
  const handleSkillsNavigate = () => {
    navigate(AppRoutes.Skills);
  };
  const handleLanguagesNavigate = () => {
    navigate(AppRoutes.Languages);
  };
  const handleCvsNavigate = () => {
    navigate(AppRoutes.Cvs.Path);
  };
  const handleProfileNavigate = () => {
    navigate(AppRoutes.Users.Children.Profile.Create(userData.id));
  };

  return (
    <StyledList>
      <Container>
        <ListItemButton
          onClick={handleUsersNavigate}
          className={active === 'employees' ? 'active' : ''}
        >
          <ListItemIcon>
            <StyledGroupIcon isActive={active === 'employees'} />
          </ListItemIcon>
          <ListItemText primary={t('employees')} />
        </ListItemButton>
        <ListItemButton
          className={active === 'skills' ? 'active' : ''}
          onClick={handleSkillsNavigate}
        >
          <ListItemIcon>
            <StyledMovingIcon isActive={active === 'skills'} />
          </ListItemIcon>
          <ListItemText primary={t('skills')} />
        </ListItemButton>
        <ListItemButton
          className={active === 'language' ? 'active' : ''}
          onClick={handleLanguagesNavigate}
        >
          <ListItemIcon>
            <StyledGTranslateIcon isActive={active === 'language'} />
          </ListItemIcon>
          <ListItemText primary={t('language')} />
        </ListItemButton>
        <ListItemButton
          className={active === 'cv' ? 'active' : ''}
          onClick={handleCvsNavigate}
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
          <BackIcon onClick={handleProfileNavigate} />
          {userData.avatar ? (
            <UserAvatar src={userData.avatar} />
          ) : (
            <UserAvatar>
              {(userData.first_name?.[0], userData.last_name?.[0]) ?? ''}
            </UserAvatar>
          )}
          <Typography>{`${userData.first_name} ${userData.last_name}`}</Typography>
        </UserStack>
      </Container>
    </StyledList>
  );
};

export default SideBar;
