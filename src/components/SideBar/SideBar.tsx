import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MovingIcon from '@mui/icons-material/Moving';
import PortraitIcon from '@mui/icons-material/Portrait';
import TranslateIcon from '@mui/icons-material/Translate';
import theme from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';

interface SideBarProps {
  active: 'employees' | 'skills' | 'language' | 'cv';
}

const SideBar: React.FC<SideBarProps> = ({ active = 'employees' }) => {
  const navigate = useNavigate();
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
        <ListItemText primary="Employees" />
      </ListItemButton>
      <ListItemButton className={active === 'skills' ? 'active' : ''}>
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
        <ListItemText primary="Skills" />
      </ListItemButton>
      <ListItemButton className={active === 'language' ? 'active' : ''}>
        <ListItemIcon>
          <TranslateIcon
            sx={{
              color:
                active === 'language'
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Language" />
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
        <ListItemText primary="CVs" />
      </ListItemButton>
    </List>
  );
};

export default SideBar;
