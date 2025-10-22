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

type Order = 'asc' | 'desc';

const UsersTable = () => {
  const { t } = useTranslation('users');

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

  const handleSort = (property: keyof UserData | keyof UserProfile) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = useMemo(() => {
    if (!data?.users) return [];
    if (!orderBy) return data.users;

    return [...data.users].sort((a, b) => {
      let aValue: string | undefined;
      let bValue: string | undefined;

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
        default:
          aValue = a.profile?.first_name ?? '';
          bValue = b.profile?.first_name;
      }

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [data, order, orderBy]);

  if (loading) return <p>Loading...</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sortable table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'first_name'}
                direction={orderBy === 'first_name' ? order : 'asc'}
                onClick={() => handleSort('first_name')}
              >
                {t('firstName')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === `last_name`}
                direction={orderBy === 'last_name' ? order : 'asc'}
                onClick={() => handleSort('last_name')}
              >
                {t('lastName')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'asc'}
                onClick={() => handleSort('email')}
              >
                {t('email')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'department_name'}
                direction={orderBy === 'department_name' ? order : 'asc'}
                onClick={() => handleSort('department_name')}
              >
                {t('department')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'position_name'}
                direction={orderBy === 'position_name' ? order : 'asc'}
                onClick={() => handleSort('position_name')}
              >
                {t('position')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">{'>'}</TableCell>
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
              <TableCell align="right">
                {user.profile?.first_name || '-'}
              </TableCell>
              <TableCell align="right">
                {user.profile?.last_name || '-'}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.department_name || '-'}</TableCell>
              <TableCell align="right">{user.position_name || '-'}</TableCell>
              <TableCell align="right">{'>'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
