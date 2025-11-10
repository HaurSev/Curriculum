import { CircularProgress } from '@mui/material';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { useLazyCvSkills } from '../../graphql/queries/cvSkills';
import useCheckedItemStore from '../../store/checkedItemStore';
import { useTranslation } from 'react-i18next';
import { useLazyDeleteCvSkill } from '../../graphql/mutations/deleteCvSkill';
import { Container, HeaderPart, MainPart } from '../Components';
import {
  ButtonStack,
  AddSkillButton,
  ActiveDeleteButton,
  InactiveDeleteButton,
} from './style';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AddCvSkill = lazy(
  () => import('../../modules/AddCvSkill/AddCvSkill.tsx'),
);
const CvSkillsBlock = lazy(
  () => import('../../modules/CvSkillsBlock/CvSkillsBlock'),
);

const CvSkillsPage = () => {
  const userData = JSON.parse(sessionStorage.getItem('user') || '');
  const checkedItems = useCheckedItemStore((state) => state.checkedItems);

  const [t] = useTranslation(['skills', 'common']);
  const [isAddOpen, setAddOpen] = useState(false);

  const { cvId } = useParams<{ cvId: string }>();

  const [cvSkills, { loading, data }] = useLazyCvSkills();

  useEffect(() => {
    loadCvSkills();
  }, []);

  const loadCvSkills = async () => {
    try {
      const response = await cvSkills({
        variables: { cvId: cvId || '' },
      });
      if (!response.data) return;
      if (!response.data.cv) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const [deleteCvSkill] = useLazyDeleteCvSkill();

  const deleteSkill = async () => {
    if (!checkedItems.length) return;

    try {
      const response = await deleteCvSkill({
        variables: {
          skill: {
            cvId: data?.cv.id || '',
            name: checkedItems.map((item) => item.name),
          },
        },
      });

      if (!response.data || !response?.data?.deleteCvSkill) return;

      useCheckedItemStore.getState().clearItems();

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

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <SideBar active="cv"></SideBar>
      <MainPart>
        <HeaderPart>
          <CvsHeader cv={data?.cv.name || ''}></CvsHeader>
          <CvsNavigation active="skills"></CvsNavigation>
        </HeaderPart>
        <Suspense>
          <CvSkillsBlock cv={data?.cv}></CvSkillsBlock>
        </Suspense>

        {(data?.cv.user?.id === userData.id || userData.role === 'Admin') && (
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
          <AddCvSkill onClick={handlSetAddOpen} />
        </Suspense>
      )}
    </Container>
  );
};

export default CvSkillsPage;
