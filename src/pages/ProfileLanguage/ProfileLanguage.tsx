import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
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
import { useLazyDeleteProfileLanguage } from '../../graphql/mutations/deleteProfileLanguages';
import useCheckedLanguagesStore from '../../store/ckeckeLanguagesStore';
import { Container, HeaderPart, MainPart } from '../Components';

const LanguageContent = lazy(
  () => import('../../components/LanguagesContent/LanguageContent'),
);

const AddLanguages = lazy(
  () => import('../../modules/AddLanguages/AddLanguages.tsx'),
);

const ProfileLanguage = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const checkedItems = useCheckedLanguagesStore((state) => state.checkedItems);
  const clearItems = useCheckedLanguagesStore((state) => state.clearItems);

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

  const [deleteProfileLanguage] = useLazyDeleteProfileLanguage();

  const deleteLanguage = async () => {
    try {
      const response = await deleteProfileLanguage({
        variables: {
          language: {
            userId: userId || '',
            name: checkedItems.map((item) => item.name),
          },
        },
      });

      if (!response.data) return;
      if (!response.data.deleteProfileLanguage) return;

      clearItems();

      toast.success(t('common:successfully'), {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
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
      <SideBar active="language" />
      <MainPart>
        <HeaderPart>
          <Header full_name={data?.profile.full_name || ''} />{' '}
          <ProfileHeader active="languages" />{' '}
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
              onClick={handlSetAddOpen}
            >
              <AddIcon />
              {t('addLanguage')}
            </Button>

            {checkedItems.length ? (
              <Button
                onClick={deleteLanguage}
                sx={{
                  gap: theme.spacing(3),
                }}
                variant="contained"
              >
                <DeleteForeverIcon />
                {`${t('removeSkills')}  ${checkedItems.length}`}
              </Button>
            ) : (
              <Button
                sx={{
                  color: theme.palette.text.secondary,
                  gap: theme.spacing(3),
                }}
              >
                <DeleteForeverIcon />
                {t('removeSkills')}
              </Button>
            )}
          </Stack>
        )}
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <AddLanguages
            onClick={handlSetAddOpen}
            userLanguages={data?.profile.languages || []}
          ></AddLanguages>
        </Suspense>
      )}
    </Container>
  );
};

export default ProfileLanguage;
