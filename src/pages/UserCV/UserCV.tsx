import React, { lazy, Suspense, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import Search from '../../components/Search/Search';
import { PageTitle, HeaderContent, AddCvButton } from './style';
import { useLazyCvs } from '../../graphql/queries/cvs.ts';
import { Container, HeaderPart, MainPart } from '../Components.ts';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material';

const UserCvTable = lazy(
  () => import('../../modules/UserCVsTable/UserCVsTable'),
);

const AddCV = lazy(() => import('../../modules/AddCV/AddCV.tsx'));

const UserCV = () => {
  const [t] = useTranslation(['CVs', 'common']);
  const [searchValue, setSearchValue] = useState('');

  const { userId } = useParams<{ userId: string }>();
  const userData = sessionStorage.getItem('user');
  const user = JSON.parse(userData || '');

  const [isAddOpen, setAddOpen] = useState(false);
  const handleSetAdd = () => {
    setAddOpen(!isAddOpen);
  };

  const [loadUser, { data, loading, error }] = useLazyCvs();

  useEffect(() => {
    loadUser({ variables: { userId: userId || '' } });
  }, [loadUser, userId]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  }, [error]);
  if (loading) return <CircularProgress />;

  return (
    <Container>
      <SideBar active={'cv'} />
      <MainPart>
        <HeaderPart>
          <PageTitle>{t('cv')}</PageTitle>
          <HeaderContent>
            <Search
              onChange={(e) => setSearchValue(e.target.value)}
              searchValue={searchValue}
            />
            {userId == user.id && (
              <AddCvButton onClick={handleSetAdd}>
                <AddIcon />
                {t('CVs:createCV')}
              </AddCvButton>
            )}
          </HeaderContent>
        </HeaderPart>
        <Suspense>
          <UserCvTable searchValue={searchValue} cvs={data?.cvs || []} />
        </Suspense>
      </MainPart>

      {isAddOpen && (
        <Suspense>
          <AddCV onClick={handleSetAdd} />
        </Suspense>
      )}
    </Container>
  );
};

export default UserCV;
