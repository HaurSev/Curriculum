import {
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MovingIcon from '@mui/icons-material/Moving';
import PortraitIcon from '@mui/icons-material/Portrait';
import theme from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Stack, styled } from '@mui/system';

interface SideBarProps {
  active: 'employees' | 'skills' | 'language' | 'cv';
}

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(3),
  marginBottom: '0',
}));

const SideBar: React.FC<SideBarProps> = ({ active = 'employees' }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const userData = JSON.parse(sessionStorage.getItem('user') || '');

  return (
    <List
      sx={{
        paddingTop: 10,
      }}
    >
      <ListItemButton
        onClick={() => navigate(AppRoutes.USERS.path)}
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
        onClick={() => navigate(AppRoutes.SKILLS)}
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
        onClick={() => navigate(AppRoutes.LANGUAGES)}
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
      <ListItemButton
        className={active === 'cv' ? 'active' : ''}
        onClick={() => navigate(AppRoutes.CVS.path)}
      >
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

      <Container>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing(5),
          }}
        >
          {userData.avatar ? (
            <Avatar
              src={userData.avatar}
              sx={{
                bgcolor: theme.palette.primary.main,
                width: '50px',
                height: '50px',
              }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: '50px',
                height: '50px',
              }}
            >
              {userData.full_name?.[0] ?? ''}
            </Avatar>
          )}
          <Typography>{userData.full_name}</Typography>
        </Stack>

        <ArrowBackIosNewIcon
          onClick={() =>
            navigate(AppRoutes.USERS.Children.PROFILE.create(userData.id))
          }
        />
      </Container>
    </List>
  );
};

export default SideBar;
