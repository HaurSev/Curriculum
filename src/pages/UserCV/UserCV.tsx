import { Box, Button, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import theme from '../../theme/theme';
import SideBar from '../../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';
import { useLazyUser } from '../../graphql/queries/user';
import { Bounce, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import AddCV from '../../modules/AddCV/AddCV';

const UserCvTable = lazy(
  () => import('../../modules/UserCVsTable/UserCVsTable'),
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

const Search = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(5),
  backgroundColor: 'transparent',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transition: '0.4s ease',
  },
  marginLeft: 0,
  width: '600px',
  height: theme.spacing(10),
  border: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '400px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
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

  const [loadUser, { data, loading, error }] = useLazyUser();

  useEffect(() => {
    loadUser({ variables: { userId: userId || '' } });
  }, [loadUser]);

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

  if (loading) return <Typography>Loading</Typography>;

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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Search>
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
            cvs={data?.user.cvs || []}
          ></UserCvTable>
        </Suspense>
      </MainPart>
      {isAddOpen && <AddCV onClick={handleSetAdd} />}
    </Container>
  );
};

export default UserCV;
