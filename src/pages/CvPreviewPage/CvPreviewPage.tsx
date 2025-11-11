import React, { useEffect } from 'react';
import { Container, HeaderPart, MainPart } from '../Components';
import SideBar from '../../components/SideBar/SideBar';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useLazyCv } from '../../graphql/queries/cv';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import CvPreviewSkills from '../../modules/CvPreviewSkills/CvPreviewSkills.tsx';
import { useTranslation } from 'react-i18next';
import {
  InfoBlock,
  SmallBlock,
  LargeBlock,
  PositionText,
  ExportButton,
  SectionTitle,
  DescriptionText,
} from './style';
import { generatePdf } from './generatePdf';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory.ts';

const CvPreviewPage = () => {
  const [t] = useTranslation(['CVs']);

  const { cvId } = useParams<{ cvId: string }>();

  const [loadCv, { data, loading }] = useLazyCv();
  const getCv = async () => {
    try {
      const response = await loadCv({ variables: { cvId: cvId || '' } });
      if (!response.data?.cv) return;
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
    getCv();
  }, []);

  const [loadSkillCategories, { data: categoriesData }] =
    useLazySkillCategories();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await loadSkillCategories();
        if (!response.data?.skillCategories) return;
      } catch (error) {
        toast.error(`${error}`, {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
          transition: Bounce,
        });
      }
    };
    fetchCategories();
  }, [loadSkillCategories]);

  const handleGenerate = () => {
    generatePdf(categoriesData?.skillCategories || [], data?.cv);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <SideBar active="cv"></SideBar>
      <MainPart>
        <HeaderPart>
          <CvsHeader cv={data?.cv.name || ''}></CvsHeader>
          <CvsNavigation active="preview"></CvsNavigation>
        </HeaderPart>
        <InfoBlock>
          <Stack>
            <Typography variant="h1">
              {data?.cv.user?.profile.full_name}
            </Typography>
            <PositionText>{data?.cv.user?.position?.name}</PositionText>
          </Stack>
          <ExportButton variant="outlined" onClick={handleGenerate}>
            {t('exportPDF')}
          </ExportButton>
        </InfoBlock>
        <InfoBlock>
          <SmallBlock>
            <Stack>
              <SectionTitle>{t('education')}</SectionTitle>
              <DescriptionText>{data?.cv.education}</DescriptionText>
            </Stack>
            <Stack>
              <SectionTitle>{t('languageProficiency')}</SectionTitle>
              <DescriptionText>
                {data?.cv.languages.map((lang) => lang.name).join(', ')}
              </DescriptionText>
            </Stack>

            <Stack>
              <SectionTitle>{t('domain')}</SectionTitle>
              {data?.cv.projects?.map((prod) => (
                <DescriptionText key={prod.id}>{prod.domain}</DescriptionText>
              ))}
            </Stack>
          </SmallBlock>
          <LargeBlock>
            <SectionTitle>{data?.cv.name}</SectionTitle>
            <DescriptionText>{data?.cv.description}</DescriptionText>
            <CvPreviewSkills skills={data?.cv.skills || []} />
          </LargeBlock>
        </InfoBlock>
      </MainPart>
    </Container>
  );
};

export default CvPreviewPage;
