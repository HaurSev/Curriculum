import TableBody from '@mui/material/TableBody';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import {
  // useLazyUsers,
  type UserData,
  type UserProfile,
} from '../../graphql/queries/users';
// import { Bounce, toast } from 'react-toastify';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import type { Order, UserTableProps } from './type';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  SortableTableCell,
  SortLabel,
  UserAvatar,
  EmailTableCell,
  ActionTableCell,
  MoreIcon,
  ArrowIcon,
} from './style';
import { TableCell } from '@mui/material';

const UsersTable: React.FC<UserTableProps> = ({
  onClick,
  searchValue,
  users,
}) => {
  const { t } = useTranslation('users');
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userId = user.id;

  // const [loadUsers, { data, loading, error }] = useLazyUsers();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<
    keyof UserData | keyof UserProfile | null
  >(null);

  // useEffect(() => {
  //   loadUsers();
  // }, [loadUsers]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(`Error: ${error.message}`, {
  //       position: 'top-center',
  //       autoClose: 5000,
  //       theme: 'dark',
  //       transition: Bounce,
  //     });
  //   }
  // }, [error]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchValue) return users;

    const lowerSearch = searchValue.toLowerCase();
    return users.filter((user) => {
      const fullName = user.profile.full_name?.toLowerCase() || '';
      return fullName.includes(lowerSearch);
    });
  }, [users, searchValue]);

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

  // if (loading) return <CircularProgress />;

  return (
    <StyledTableContainer>
      <StyledTable aria-label="sortable table">
        <StyledTableHead>
          <StyledTableRow>
            <TableCell></TableCell>
            <SortableTableCell>
              <SortLabel
                active={orderBy === 'first_name'}
                direction={orderBy === 'first_name' ? order : 'asc'}
                onClick={() => handleSort('first_name')}
              >
                {t('firstName')}
              </SortLabel>
            </SortableTableCell>
            <SortableTableCell>
              <SortLabel
                active={orderBy === 'last_name'}
                direction={orderBy === 'last_name' ? order : 'asc'}
                onClick={() => handleSort('last_name')}
              >
                {t('lastName')}
              </SortLabel>
            </SortableTableCell>
            <SortableTableCell>
              <SortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'asc'}
                onClick={() => handleSort('email')}
              >
                {t('email')}
              </SortLabel>
            </SortableTableCell>
            <SortableTableCell>
              <SortLabel
                active={orderBy === 'department_name'}
                direction={orderBy === 'department_name' ? order : 'asc'}
                onClick={() => handleSort('department_name')}
              >
                {t('department')}
              </SortLabel>
            </SortableTableCell>
            <SortableTableCell>
              <SortLabel
                active={orderBy === 'position_name'}
                direction={orderBy === 'position_name' ? order : 'asc'}
                onClick={() => handleSort('position_name')}
              >
                {t('position')}
              </SortLabel>
            </SortableTableCell>
            <TableCell align="left"></TableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {sortedUsers.map((user, index) => (
            <StyledTableRow key={user.id || index}>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  navigate(AppRoutes.Users.Children.Profile.Create(user.id))
                }
              >
                {user.profile.avatar ? (
                  <UserAvatar src={user.profile.avatar} />
                ) : (
                  <UserAvatar>{user.profile.first_name?.[0] ?? ''}</UserAvatar>
                )}
              </TableCell>
              <TableCell align="left">
                {user.profile?.first_name || '-'}
              </TableCell>
              <TableCell align="left">
                {user.profile?.last_name || '-'}
              </TableCell>
              <EmailTableCell>{user.email}</EmailTableCell>
              <TableCell align="left">{user.department_name || '-'}</TableCell>
              <TableCell align="left">{user.position_name || '-'}</TableCell>
              <ActionTableCell>
                {user.id === userId ? (
                  <MoreIcon onClick={() => onClick(user)} />
                ) : (
                  <ArrowIcon
                    onClick={() =>
                      navigate(AppRoutes.Users.Children.Profile.Create(user.id))
                    }
                  />
                )}
              </ActionTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default UsersTable;
