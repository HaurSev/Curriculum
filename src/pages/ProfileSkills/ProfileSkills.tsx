import { lazy, Suspense, useEffect, useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { Box, Button, styled, Typography } from '@mui/material';
import theme from '../../theme/theme';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useLazyProfile } from '../../graphql/queries/profile';
import { Bounce, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Stack } from '@mui/system';

const SkillsBlock = lazy(() => import('../../modules/SkillsBlock/SkillsBlock'));
const AddSkill = lazy(() => import('../../modules/AddSkill/AddSkill'));

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

const ProfileSkills = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [t] = useTranslation(['skills', 'common']);
  const [isAddOpen, setAddOpen] = useState(false);

  const [profile, { loading, data }] = useLazyProfile();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await profile({
        variables: {
          userId: userId || '',
        },
      });

      if (!response.data) return;
      if (!response.data.profile) return;
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
    return <Typography>{t('common:loading')}</Typography>;
  }

  return (
    <Container>
      <SideBar active="skills" />
      <MainPart>
        <HeaderPart>
          <Header full_name={data?.profile.full_name || ''} />
          <ProfileHeader active="skills" />
        </HeaderPart>
        <Suspense>
          <SkillsBlock skills={data?.profile.skills || []} />
        </Suspense>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {(userId === userData.id || userData.role === 'Admin') && (
            <Button
              onClick={() => setAddOpen(true)}
              sx={{
                gap: theme.spacing(3),
              }}
            >
              <AddIcon />
              {t('skills:addSkill')}
            </Button>
          )}
          {(userId === userData.id || userData.role === 'Admin') && (
            <Button
              onClick={() => setAddOpen(true)}
              sx={{
                color: theme.palette.text.secondary,
                gap: theme.spacing(3),
              }}
            >
              <DeleteForeverIcon />
              {t('skills:removeSkills')}
            </Button>
          )}
        </Stack>
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <AddSkill onClick={() => setAddOpen(false)} />
        </Suspense>
      )}
    </Container>
  );
};

export default ProfileSkills;
