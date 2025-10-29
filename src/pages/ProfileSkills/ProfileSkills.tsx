import React, { useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { Box, styled, Typography } from '@mui/material';
import theme from '../../theme/theme';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useLazyProfile } from '../../graphql/queries/profile';
import { Bounce, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SkillsBlock from '../../modules/SkillsBlock/SkillsBlock';

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
  const [t] = useTranslation();

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
    return <Typography>{t('loading')}</Typography>;
  }

  return (
    <Container>
      <SideBar active="skills" />
      <MainPart>
        <HeaderPart>
          <Header full_name={data?.profile.full_name || ''}></Header>
          <ProfileHeader active="skills" />
        </HeaderPart>
        <SkillsBlock skills={data?.profile.skills || []}></SkillsBlock>
      </MainPart>
    </Container>
  );
};

export default ProfileSkills;
