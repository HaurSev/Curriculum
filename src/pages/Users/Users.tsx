import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import UsersTable from '../../modules/UsersTable/UsersTable';
import { Box, InputBase, styled, Typography } from '@mui/material';
import theme from '../../theme/theme';
import SearchIcon from '@mui/icons-material/Search';
import { lazy, Suspense, useState } from 'react';
import type { UserData } from '../../graphql/queries/users';

const UpdateProfile = lazy(
  () => import('../../modules/UpdateProfile/UpdateProfile'),
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
  elevation: 0,
  gap: theme.spacing(2),
}));

const HeaderPart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
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
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Users = () => {
  const [t] = useTranslation('common');
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <Container>
      {isOpen === true && user !== null ? (
        <Suspense>
          <UpdateProfile onClick={() => setOpen(false)} user={user} />
        </Suspense>
      ) : (
        ''
      )}

      <SideBar active="employees" />
      <MainPart>
        <HeaderPart>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.disabled }}
          >
            {t('employees')}
          </Typography>
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
        </HeaderPart>

        <UsersTable
          onClick={(selectedUser) => {
            setUser(selectedUser);
            setOpen(true);
          }}
          searchValue={searchValue}
        />
      </MainPart>
    </Container>
  );
};

export default Users;
