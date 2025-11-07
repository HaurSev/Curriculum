import { Box, Button, Typography } from '@mui/material';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import theme from '../../theme/theme';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import SideBar from '../../components/SideBar/SideBar';
import { useLazyCvs } from '../../graphql/queries/cvs';
import type { Cv } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import { Container, HeaderPart, MainPart } from '../Components';
import Search from '../../components/Search/Search';

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

  useEffect(() => {
    getCvs();
  }, [loadCvs]);

  if (loading) return <Button variant="text" loading={loading}></Button>;

  return (
    <Container>
      <SideBar active={'cv'}></SideBar>
      <MainPart>
        <HeaderPart>
          <Typography
            sx={{
              color: theme.palette.text.disabled,
            }}
          >
            {t('cv')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              lexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Search
              searchValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></Search>
            <Button
              onClick={handleSetAdd}
              sx={{
                gap: theme.spacing(3),
                color: theme.palette.text.secondary,
              }}
            >
              <AddIcon />
              {t('CVs:createCV')}
            </Button>
          </Box>
        </HeaderPart>

        <Suspense>
          <UserCvTable searchValue={searchValue} cvs={cvs || []}></UserCvTable>
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

export default CVsPage;
