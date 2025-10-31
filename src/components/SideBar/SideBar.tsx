import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MovingIcon from '@mui/icons-material/Moving';
import PortraitIcon from '@mui/icons-material/Portrait';
import theme from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import GTranslateIcon from '@mui/icons-material/GTranslate';

interface SideBarProps {
  active: 'employees' | 'skills' | 'language' | 'cv';
}

const SideBar: React.FC<SideBarProps> = ({ active = 'employees' }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const user = sessionStorage.getItem('user') || '';

  const userData = JSON.parse(user);

  return (
    <List
      sx={{
        paddingTop: 10,
      }}
    >
      <ListItemButton
        onClick={() => navigate(AppRoutes.USERS)}
        className={active === 'employees' ? 'active' : ''}
      >
        <ListItemIcon>
          <GroupIcon
            sx={{
              color:
                active === 'employees'
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={t('employees')} />
      </ListItemButton>
      <ListItemButton
        className={active === 'skills' ? 'active' : ''}
        onClick={() => navigate(AppRoutes.SKILLS.create(userData.id))}
      >
        <ListItemIcon>
          <MovingIcon
            sx={{
              color:
                active === 'skills'
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={t('skills')} />
      </ListItemButton>
      <ListItemButton
        className={active === 'language' ? 'active' : ''}
        onClick={() => navigate(AppRoutes.LANGUAGES.create(userData.id))}
      >
        <ListItemIcon>
          <GTranslateIcon
            sx={{
              color:
                active === 'language'
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={t('language')} />
      </ListItemButton>
      <ListItemButton className={active === 'cv' ? 'active' : ''}>
        <ListItemIcon>
          <PortraitIcon
            sx={{
              color:
                active === 'cv'
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={t('cv')} />
      </ListItemButton>
    </List>
  );
};

export default SideBar;
