import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import UsersTable from '../../modules/UsersTable/UsersTable';
import { Typography } from '@mui/material';
import theme from '../../theme/theme';
import { lazy, Suspense, useState } from 'react';
import type { UserData } from '../../graphql/queries/users';
import Search from '../../components/Search/Search';
import { Container, HeaderPart, MainPart } from '../Components';

const UpdateProfile = lazy(
  () => import('../../modules/UpdateProfile/UpdateProfile.tsx'),
);

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
          <Search
            onChange={(e) => setSearchValue(e.target.value)}
            searchValue={searchValue}
          ></Search>
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
