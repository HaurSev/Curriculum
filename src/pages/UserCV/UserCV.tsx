import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import theme from '../../theme/theme';
import SideBar from '../../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { useLazyCvs } from '../../graphql/queries/cvs';
import Search from '../../components/Search/Search';

const UserCvTable = lazy(
  () => import('../../modules/UserCVsTable/UserCVsTable'),
);

const AddCV = lazy(() => import('../../modules/AddCV/AddCV.tsx'));

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
  padding: theme.spacing(10),
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
              onChange={(e) => setSearchValue(e.target.value)}
              searchValue={searchValue}
            ></Search>

            {userId == user.id && (
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
            )}
          </Box>
        </HeaderPart>

        <Suspense>
          <UserCvTable
            searchValue={searchValue}
            cvs={data?.cvs || []}
          ></UserCvTable>
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
