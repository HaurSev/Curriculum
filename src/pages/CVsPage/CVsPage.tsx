import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import { useLazyCvs } from '../../graphql/queries/cvs';
import type { Cv } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import { Container, HeaderPart, MainPart } from '../Components';
import Search from '../../components/Search/Search';
import AddIcon from '@mui/icons-material/Add';
import { PageTitle, HeaderContent, AddCvButton } from './style';
import { CircularProgress } from '@mui/material';

const UserCvTable = lazy(
  () => import('../../modules/UserCVsTable/UserCVsTable'),
);

const AddCV = lazy(() => import('../../modules/AddCV/AddCV.tsx'));

const CVsPage = () => {
  const [t] = useTranslation(['CVs', 'common']);
  const [searchValue, setSearchValue] = useState('');

  const [isAddOpen, setAddOpen] = useState(false);
  const handleSetAdd = () => {
    setAddOpen(!isAddOpen);
  };

  const [loadCvs, { loading }] = useLazyCvs();
  const [cvs, setCvs] = useState<Cv[]>([]);

  const getCvs = async () => {
    try {
      const result = await loadCvs();
      if (!result.data?.cvs) return;
      setCvs(result.data.cvs);
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const addCvToState = (newCv: Cv) => {
    setCvs((prev) => [newCv, ...prev]);
  };

  const updateCvInState = (updatedCv: Cv) => {
    setCvs((prev) =>
      prev.map((cv) => (cv.id === updatedCv.id ? updatedCv : cv)),
    );
  };

  const deleteCvItem = () => {
    getCvs();
  };

  useEffect(() => {
    getCvs();
  }, [loadCvs]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <SideBar active={'cv'}></SideBar>
      <MainPart>
        <HeaderPart>
          <PageTitle>{t('cv')}</PageTitle>
          <HeaderContent>
            <Search
              searchValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <AddCvButton onClick={handleSetAdd}>
              <AddIcon />
              {t('CVs:createCV')}
            </AddCvButton>
          </HeaderContent>
        </HeaderPart>

        <Suspense>
          <UserCvTable
            searchValue={searchValue}
            cvs={cvs || []}
            onUpdated={updateCvInState}
            onDelete={deleteCvItem}
          />
        </Suspense>
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <AddCV onClick={handleSetAdd} onCreated={addCvToState} />
        </Suspense>
      )}
    </Container>
  );
};

export default CVsPage;
