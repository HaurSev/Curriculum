import React, { useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileAvatar from '../../modules/ProfileAvatar/ProfileAvatar';
import { useLazyUser } from '../../graphql/queries/user';
import { Bounce, toast } from 'react-toastify';
import { Box, Button, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../theme/theme';
import { Stack } from '@mui/system';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SideBar from '../../components/SideBar/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import UserInfo from '../../components/UserInfo/UserInfo';
import UpdateUserProfile from '../../modules/UpdateUserProfile/UpdateUserProfile';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  minHeight: '100vh',
}));

const MainPart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  elevation: 0,
  gap: theme.spacing(5),
}));

const HeaderPart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
  width: '100%',
  paddingLeft: theme.spacing(5),
  elevation: 0,
}));

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [t] = useTranslation(['common', 'users']);
  const userJson = sessionStorage.getItem('user') || '';
  const userDate = JSON.parse(userJson);

  const [user, { loading, data }] = useLazyUser();

  useEffect(() => {
    loadUser();
  }, []);

  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const response = await user({
        variables: {
          userId: userId || '',
        },
      });

      if (!response.data) return;
      if (!response.data.user.profile) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  if (loading) {
    return <Typography>{t('loading')}</Typography>;
  }

  return (
    <Container>
      <SideBar active="employees" />
      <MainPart>
        <HeaderPart>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontWeight: 300,
              color: theme.palette.text.disabled,
            }}
          >
            <Button
              sx={{
                textTransform: 'capitalize',
              }}
              onClick={() => navigate(AppRoutes.USERS)}
            >
              {t('employee')}
            </Button>
            <KeyboardArrowRightIcon />
            <Button
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.text.secondary,
              }}
            >
              <PersonOutlineOutlinedIcon />
              {data?.user.profile.full_name || t('username')}
            </Button>
          </Stack>

          <ProfileHeader active="profile" />
        </HeaderPart>

        <ProfileAvatar
          first_name={data?.user.profile.first_name || t('firstName')}
          avatar={data?.user.profile.avatar || ''}
          userId={userId || ''}
        />

        <UserInfo
          full_name={data?.user.profile.full_name || ''}
          email={data?.user.email || ''}
          created_at={data?.user.created_at || ''}
        />

        {userId === userDate.id && (
          <UpdateUserProfile
            first_name={data?.user.profile.first_name || ''}
            last_name={data?.user.profile.last_name || ''}
            position={data?.user.position?.name || ''}
            department={data?.user.department?.name || ''}
          ></UpdateUserProfile>
        )}
      </MainPart>
    </Container>
  );
};

export default Profile;
