import { lazy, Suspense, useEffect, useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useLazyProfile } from '../../graphql/queries/profile';
import { Bounce, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useCheckedItemStore from '../../store/checkedItemStore';
import { useLazyDeleteProfileSkill } from '../../graphql/mutations/deleteProfileSkill';
import { Container, HeaderPart, MainPart } from '../Components';
import {
  ButtonStack,
  AddSkillButton,
  ActiveDeleteButton,
  InactiveDeleteButton,
} from './style';
import { CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const SkillsBlock = lazy(() => import('../../modules/SkillsBlock/SkillsBlock'));
const AddSkill = lazy(() => import('../../modules/AddSkill/AddSkill.tsx'));

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
    if (!checkedItems.length) return;

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

  if (loading) return <CircularProgress></CircularProgress>;

  return (
    <Container>
      <SideBar active="skills" />
      <MainPart>
        <HeaderPart>
          <Header fullName={data?.profile.full_name || ''} />
          <ProfileHeader active="skills" />
        </HeaderPart>
        <Suspense>
          <SkillsBlock skills={data?.profile.skills || []} />
        </Suspense>
        {(userId === userData.id || userData.role === 'Admin') && (
          <Suspense>
            <ButtonStack>
              <AddSkillButton onClick={handlSetAddOpen}>
                <AddIcon />
                {t('skills:addSkill')}
              </AddSkillButton>

              {checkedItems.length ? (
                <ActiveDeleteButton onClick={deleteSkill} variant="contained">
                  <DeleteForeverIcon />
                  {`${t('skills:removeSkills')} ${checkedItems.length}`}
                </ActiveDeleteButton>
              ) : (
                <InactiveDeleteButton onClick={deleteSkill}>
                  <DeleteForeverIcon />
                  {t('skills:removeSkills')}
                </InactiveDeleteButton>
              )}
            </ButtonStack>
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
