import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useMemo } from 'react';
import {
  useLazyUsers,
  type UserData,
  type UserProfile,
} from '../../graphql/queries/users';
import { Bounce, toast } from 'react-toastify';
import { Avatar } from '@mui/material';
import theme from '../../theme/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Order = 'asc' | 'desc';

interface UserTableProps {
  onClick: (user: UserData) => void;
  searchValue?: string;
}

const UsersTable: React.FC<UserTableProps> = ({ onClick, searchValue }) => {
  const { t } = useTranslation('users');

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userId = user.id;

  const [loadUsers, { data, loading, error }] = useLazyUsers();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<
    keyof UserData | keyof UserProfile | null
  >(null);

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

  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];
    if (!searchValue) return data.users;

    const lowerSearch = searchValue.toLowerCase();
    return data.users.filter((user) => {
      // const fullName = user.profile.full_name?.toLowerCase() || '';
      const fullName = user.email?.toLowerCase() || '';
      return fullName.includes(lowerSearch);
    });
  }, [data, searchValue]);

  const sortedUsers = useMemo(() => {
    if (!filteredUsers) return [];
    if (!orderBy) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      let aValue = '';
      let bValue = '';

      switch (orderBy) {
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'department_name':
          aValue = a.department_name ?? '';
          bValue = b.department_name ?? '';
          break;
        case 'position_name':
          aValue = a.position_name ?? '';
          bValue = b.position_name ?? '';
          break;
        case 'last_name':
          aValue = a.profile?.last_name ?? '';
          bValue = b.profile?.last_name ?? '';
          break;
        case 'first_name':
          aValue = a.profile?.first_name ?? '';
          bValue = b.profile?.first_name ?? '';
          break;
        default:
          aValue = '';
          bValue = '';
      }

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredUsers, order, orderBy]);

  const handleSort = (property: keyof UserData | keyof UserProfile) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <TableContainer
      component={Paper}
      sx={{ background: 'transparent' }}
      elevation={0}
    >
      <Table sx={{ minWidth: 650 }} aria-label="sortable table">
        <TableHead
          sx={{
            height: 60,
            textTransform: 'capitalize',
          }}
        >
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">
              <TableSortLabel
                sx={{
                  fontWeight: 600,
                }}
                active={orderBy === 'first_name'}
                direction={orderBy === 'first_name' ? order : 'asc'}
                onClick={() => handleSort('first_name')}
              >
                {t('firstName')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                sx={{
                  fontWeight: 600,
                }}
                active={orderBy === 'last_name'}
                direction={orderBy === 'last_name' ? order : 'asc'}
                onClick={() => handleSort('last_name')}
              >
                {t('lastName')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                sx={{
                  fontWeight: 600,
                }}
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'asc'}
                onClick={() => handleSort('email')}
              >
                {t('email')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                sx={{
                  fontWeight: 600,
                }}
                active={orderBy === 'department_name'}
                direction={orderBy === 'department_name' ? order : 'asc'}
                onClick={() => handleSort('department_name')}
              >
                {t('department')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                sx={{
                  fontWeight: 600,
                }}
                active={orderBy === 'position_name'}
                direction={orderBy === 'position_name' ? order : 'asc'}
                onClick={() => handleSort('position_name')}
              >
                {t('position')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user, index) => (
            <TableRow key={user.id || index}>
              <TableCell component="th" scope="row">
                {user.profile.avatar ? (
                  <Avatar
                    src={user.profile.avatar}
                    sx={{ bgcolor: theme.palette.primary.main }}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {user.profile.first_name?.[0] ?? ''}
                  </Avatar>
                )}
              </TableCell>
              <TableCell align="left">
                {user.profile?.first_name || '-'}
              </TableCell>
              <TableCell align="left">
                {user.profile?.last_name || '-'}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.department_name || '-'}</TableCell>
              <TableCell align="left">{user.position_name || '-'}</TableCell>
              <TableCell align="left">
                {user.id === userId ? (
                  <MoreVertIcon onClick={() => onClick(user)} />
                ) : (
                  <ArrowForwardIosIcon />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
