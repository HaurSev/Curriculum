import { lazy, Suspense, useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useLazyUser } from '../../graphql/queries/user';
import { Bounce, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import { useParams } from 'react-router-dom';
import UserInfo from '../../components/UserInfo/UserInfo';
import Header from '../../components/Header/Header';
import { Container, HeaderPart, MainPart } from '../Components';

const UserUpdateProfile = lazy(
  () => import('../../modules/UserUpdateProfile/UserUpdateProfile'),
);

const ProfileAvatar = lazy(
  () => import('../../modules/ProfileAvatar/ProfileAvatar.tsx'),
);

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [t] = useTranslation(['common', 'users']);

  const [user, { loading, data, refetch }] = useLazyUser();

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

  useEffect(() => {
    loadUser();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <SideBar active="employees" />
      <MainPart>
        <HeaderPart>
          <Header full_name={data?.user.profile.full_name || ''}></Header>

          <ProfileHeader active="profile" />
        </HeaderPart>

        <Suspense>
          <ProfileAvatar
            first_name={data?.user.profile.first_name || t('firstName')}
            avatar={data?.user.profile.avatar || ''}
            userId={userId || ''}
            onUpdate={refetch}
          />
        </Suspense>

        <UserInfo
          full_name={data?.user.profile.full_name || ''}
          email={data?.user.email || ''}
          created_at={data?.user.created_at || ''}
        />

        <Suspense>
          <UserUpdateProfile
            userId={userId || ''}
            first_name={data?.user.profile.first_name || ''}
            last_name={data?.user.profile.last_name || ''}
            position_name={data?.user.position?.name || ''}
            department_name={data?.user.department?.name || ''}
            onUpdate={refetch}
          ></UserUpdateProfile>
        </Suspense>
      </MainPart>
    </Container>
  );
};

export default Profile;
