import { Button, styled, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import theme from '../../theme/theme';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useLazyProfile } from '../../graphql/queries/profile';
import { Bounce, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LanguageContent = lazy(
  () => import('../../components/LanguagesContent/LanguageContent'),
);

const AddLanguages = lazy(
  () => import('../../modules/AddLanguages/AddLanguages'),
);

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

const ProfileLanguage = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [t] = useTranslation(['languages', 'common']);
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
      <SideBar active="language" />
      <MainPart>
        <HeaderPart>
          <Header full_name={data?.profile.full_name || ''} />
          <ProfileHeader active="languages" />
        </HeaderPart>

        {data?.profile.languages && (
          <Suspense>
            <LanguageContent
              languages={data?.profile.languages || []}
            ></LanguageContent>
          </Suspense>
        )}

        {(userId === userData.id || userData.role === 'Admin') && (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              sx={{
                gap: theme.spacing(3),
              }}
              onClick={() => setAddOpen(true)}
            >
              <AddIcon />
              {t('addLanguage')}
            </Button>

            <Button
              sx={{
                color: theme.palette.text.secondary,
                gap: theme.spacing(3),
              }}
            >
              <DeleteForeverIcon />
              {t('removeSkills')}
            </Button>
          </Stack>
        )}
      </MainPart>

      {isAddOpen && (
        <Suspense>
          <AddLanguages
            onClick={() => setAddOpen(false)}
            userLanguages={data?.profile.languages || []}
          ></AddLanguages>
        </Suspense>
      )}
    </Container>
  );
};

export default ProfileLanguage;
