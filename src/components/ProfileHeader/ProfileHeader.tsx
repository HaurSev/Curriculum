import { useTranslation } from 'react-i18next';
import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import type { ProfileHeaderProps } from './type';
import { StyledButtonGroup, ProfileButton } from './style';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ active }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { t } = useTranslation('common');

  return (
    <div>
      <StyledButtonGroup variant="text">
        <ProfileButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Users.Children.Profile.Create(userId || ''))
          }
          isActive={active === 'profile'}
        >
          {t('profile')}
        </ProfileButton>

        <ProfileButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Users.Children.Skills.Create(userId || ''))
          }
          isActive={active === 'skills'}
        >
          {t('skills')}
        </ProfileButton>

        <ProfileButton
          variant="text"
          onClick={() =>
            navigate(
              AppRoutes.Users.Children.UserLanguages.Create(userId || ''),
            )
          }
          isActive={active === 'languages'}
        >
          {t('languages')}
        </ProfileButton>
      </StyledButtonGroup>
    </div>
  );
};

export default ProfileHeader;
