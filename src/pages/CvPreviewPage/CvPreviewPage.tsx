import React, { useEffect } from 'react';
import { Container, HeaderPart, MainPart } from '../Components';
import SideBar from '../../components/SideBar/SideBar';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useLazyCv } from '../../graphql/queries/cv';
import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import theme from '../../theme/theme';
import CvPreviewSkills from '../../modules/CvPreviewSkills/CvPreviewSkills.tsx';
import { InfoBlock, LargeBlock, SmallBlock } from './style';
import { useTranslation } from 'react-i18next';

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
            <Typography
              variant="h6"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: theme.spacing(1),
              }}
            >
              {data?.cv.user?.position?.name}
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.text.secondary,
              borderColor: theme.palette.text.secondary,
            }}
          >
            {t('exportPDF')}
          </Button>
        </InfoBlock>
        <InfoBlock>
          <SmallBlock>
            <Stack>
              <Typography variant="h5" fontWeight={700}>
                {t('education')}
              </Typography>
              <Typography variant="body1">{data?.cv.education}</Typography>
            </Stack>
            <Stack>
              <Typography fontWeight={700} variant="h5">
                {t('languageProficiency')}
              </Typography>
              <Typography>
                {data?.cv.languages.map((lang) => lang.name).join(', ')}
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h5" fontWeight={700}>
                {t('domain')}
              </Typography>
              {data?.cv.projects?.map((prod) => (
                <Typography variant="body1">{prod.domain}</Typography>
              ))}
            </Stack>
          </SmallBlock>
          <LargeBlock>
            <Typography variant="h5" fontWeight={700}>
              {data?.cv.name}
            </Typography>
            <Typography variant="body1">{data?.cv.description}</Typography>
            <CvPreviewSkills skills={data?.cv.skills || []} />
          </LargeBlock>
        </InfoBlock>
      </MainPart>
    </Container>
  );
};

export default CvPreviewPage;
