import { Box, Button, styled } from '@mui/material';
import theme from '../../theme/theme';
import SideBar from '../../components/SideBar/SideBar';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import { useParams } from 'react-router-dom';
import { useLazyCvDetails } from '../../graphql/queries/cvDetails';
import { lazy, Suspense, useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';

const CvDetailsForm = lazy(
  () => import('../../modules/CvDetailsForm/CvDetailsForm'),
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

const CvDetailsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const [cvDetails, { loading, data }] = useLazyCvDetails();

  const loadCvDetails = async () => {
    try {
      const response = await cvDetails({
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

  useEffect(() => {
    loadCvDetails();
  }, []);

  if (loading) return <Button variant="text" loading={loading}></Button>;

  return (
    <Container>
      <SideBar active="skills"></SideBar>
      <MainPart>
        <HeaderPart>
          <CvsHeader cv={data?.cv.name || ''}></CvsHeader>
          <CvsNavigation active="details"></CvsNavigation>
        </HeaderPart>
        {data?.cv && (
          <Suspense>
            <CvDetailsForm cv={data.cv}></CvDetailsForm>
          </Suspense>
        )}
      </MainPart>
    </Container>
  );
};

export default CvDetailsPage;
