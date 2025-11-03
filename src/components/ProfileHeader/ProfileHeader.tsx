import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from '@mui/material';
// import { AppRoutes } from '../../router/router';
import theme from '../../theme/theme';
import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../router/router';

interface ProfileHeaderProps {
  active: 'profile' | 'skills' | 'languages';
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ active }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { t } = useTranslation('common');
  return (
    <div>
      <ButtonGroup
        variant="text"
        sx={{
          width: '100%',
          justifyContent: 'center',
          gap: 2,
          '& .MuiButton-root': {
            width: 180,
            fontSize: 14,
            paddingY: theme.spacing(4),
          },
        }}
      >
        <Button
          variant="text"
          onClick={() =>
            navigate(AppRoutes.USERS.Children.PROFILE.create(userId || ''))
          }
          sx={{
            color:
              active === 'profile'
                ? theme.palette.text.secondary
                : theme.palette.text.disabled,
            borderBottom:
              active === 'profile'
                ? `2px solid ${theme.palette.text.secondary}`
                : 'none',

            borderRadius: 0,
          }}
        >
          {t('profile')}
        </Button>

        <Button
          variant="text"
          onClick={() =>
            navigate(AppRoutes.USERS.Children.SKILLS.create(userId || ''))
          }
          sx={{
            color:
              active === 'skills'
                ? theme.palette.text.secondary
                : theme.palette.text.disabled,
            borderBottom:
              active === 'skills'
                ? `2px solid ${theme.palette.text.secondary}`
                : 'none',
            borderRadius: 0,
          }}
        >
          {t('skills')}
        </Button>
        <Button
          variant="text"
          onClick={() =>
            navigate(AppRoutes.USERS.Children.LANGUAGES.create(userId || ''))
          }
          sx={{
            color:
              active === 'languages'
                ? theme.palette.text.secondary
                : theme.palette.text.disabled,
            borderBottom:
              active === 'languages'
                ? `2px solid ${theme.palette.text.secondary}`
                : 'none',
            borderRadius: 0,
          }}
        >
          {t('languages')}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ProfileHeader;
