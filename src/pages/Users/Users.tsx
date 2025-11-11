import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import UsersTable from '../../modules/UsersTable/UsersTable';
import { CircularProgress, Typography } from '@mui/material';
import theme from '../../theme/theme';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useLazyUsers, type UserData } from '../../graphql/queries/users';
import Search from '../../components/Search/Search';
import { Container, HeaderPart, MainPart } from '../Components';
import { Bounce, toast } from 'react-toastify';

const UpdateProfile = lazy(
  () => import('../../modules/UpdateProfile/UpdateProfile.tsx'),
);

const Users = () => {
  const [t] = useTranslation('common');
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState<UserData | null>(null);

  const [loadUsers, { data, loading, error, refetch }] = useLazyUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

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
      {isOpen === true && user !== null ? (
        <Suspense>
          <UpdateProfile
            onClick={() => setOpen(false)}
            user={user}
            onSuccess={refetch}
          />
        </Suspense>
      ) : (
        ''
      )}

      <SideBar active="employees" />
      <MainPart>
        <HeaderPart>
          <Typography
            variant="body1"
            style={{ color: theme.palette.text.disabled }}
          >
            {t('employees')}
          </Typography>
          <Search
            onChange={(e) => setSearchValue(e.target.value)}
            searchValue={searchValue}
          ></Search>
        </HeaderPart>

        <UsersTable
          users={data?.users || []}
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
