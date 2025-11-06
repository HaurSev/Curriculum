import { Button } from '@mui/material';
import SideBar from '../../components/SideBar/SideBar';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import { useParams } from 'react-router-dom';
import { useLazyCvDetails } from '../../graphql/queries/cvDetails';
import { lazy, Suspense, useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';
import { Container, HeaderPart, MainPart } from '../Components';

const CvDetailsForm = lazy(
  () => import('../../modules/CvDetailsForm/CvDetailsForm.tsx'),
);

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
