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
import useCheckedItemStore from '../../store/checkedItemStore';
import { useLazyDeleteProfileSkill } from '../../graphql/mutations/deleteProfileSkill';

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
  const userData = JSON.parse(sessionStorage.getItem('user') || '');

  const checkedItems = useCheckedItemStore((state) => state.checkedItems);

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

  const [deleteProfileSkill] = useLazyDeleteProfileSkill();

  const deleteSkill = async () => {
    try {
      const response = await deleteProfileSkill({
        variables: {
          skill: {
            userId: userId || '',
            name: checkedItems.map((item) => item.name),
          },
        },
      });

      if (!response.data || !response.data.deleteProfileSkill) return;

      toast.success(t('common:successfully'), {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });

      useCheckedItemStore.getState().clearItems();
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      });
    }
  };

  const handlSetAddOpen = () => {
    setAddOpen(!isAddOpen);
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
          <SkillsBlock
            userId={data?.profile.id || ''}
            skills={data?.profile.skills || []}
          />
        </Suspense>
        {(userId === userData.id || userData.role === 'Admin') && (
          <Suspense>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Button
                onClick={handlSetAddOpen}
                sx={{
                  gap: theme.spacing(3),
                }}
              >
                <AddIcon />
                {t('skills:addSkill')}
              </Button>

              {checkedItems.length ? (
                <Button
                  onClick={deleteSkill}
                  sx={{
                    color: theme.palette.text.primary,
                    gap: theme.spacing(3),
                  }}
                  variant="contained"
                >
                  <DeleteForeverIcon />
                  {`${t('skills:removeSkills')} ${checkedItems.length}`}
                </Button>
              ) : (
                <Button
                  onClick={deleteSkill}
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
          </Suspense>
        )}
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <AddSkill onClick={handlSetAddOpen} />
        </Suspense>
      )}
    </Container>
  );
};

export default ProfileSkills;
