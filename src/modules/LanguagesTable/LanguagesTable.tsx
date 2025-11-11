import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
} from '@mui/material';
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyLanguages } from '../../graphql/queries/languages';
import { Bounce, toast } from 'react-toastify';
import type { LanguagesTableProps, Order } from './type.ts';
import {
  StyledTableContainer,
  StyledTableHead,
  SortableTableCell,
  StyledTableRow,
  ActionTableCell,
  MoreIcon,
} from './style';

const DeleteLanguage = lazy(
  () => import('../../components/DeleteLanguage/DeleteLanguage'),
);

const UpdateLanguage = lazy(
  () => import('../../modules/UpdateLanguage/UpdateLanguage.tsx'),
);

const LanguagesTable: React.FC<LanguagesTableProps> = ({ searchValue }) => {
  const { t } = useTranslation(['languages', 'common']);

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [openUpdateId, setOpenUpdateId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>('asc');

  const handleOpenDelete = useCallback((id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  }, []);

  const handleOpenUpdate = useCallback((id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
  }, []);

  const getOpenDeleteHandler = useCallback(
    (id: string) => () => handleOpenDelete(id),
    [handleOpenDelete],
  );

  const getOpenUpdateHandler = useCallback(
    (id: string) => () => handleOpenUpdate(id),
    [handleOpenUpdate],
  );

  const [loadLanguages, { data, loading, error }] = useLazyLanguages();

  useEffect(() => {
    loadLanguages();
  }, [loadLanguages]);

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
    if (!data?.languages) return [];
    if (!searchValue) return data.languages;

    const lowerSearch = searchValue.toLowerCase();

    return data.languages.filter((lang) => {
      const lowerName = lang.name.toLowerCase();
      return lowerName.includes(lowerSearch);
    });
  }, [data, searchValue]);

  const sortedUsers = useMemo(() => {
    if (!filteredUsers) return [];

    return [...filteredUsers].sort((a, b) => {
      const aValue = a.name;
      const bValue = b.name;

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredUsers, order]);

  const handleSort = () => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  if (loading) return <CircularProgress />;

  return (
    <StyledTableContainer>
      <Table>
        <StyledTableHead>
          <StyledTableRow>
            <SortableTableCell>
              <TableSortLabel onClick={handleSort}>{t('name')}</TableSortLabel>
            </SortableTableCell>
            <TableCell>{t('nativeName')}</TableCell>
            <TableCell>{t('iso')}</TableCell>
            <TableCell></TableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {sortedUsers.map((lang, index) => (
            <StyledTableRow key={lang.id || index}>
              <TableCell onClick={getOpenUpdateHandler(lang.id)}>
                {lang.name}
              </TableCell>
              <TableCell>{lang.native_name}</TableCell>
              <TableCell>{lang.iso2}</TableCell>
              <ActionTableCell onClick={getOpenDeleteHandler(lang.id)}>
                <MoreIcon />
              </ActionTableCell>
              {openDeleteId === lang.id && (
                <Suspense>
                  <DeleteLanguage
                    language={lang}
                    onClick={getOpenDeleteHandler('')}
                  />
                </Suspense>
              )}
              {openUpdateId === lang.id && (
                <Suspense>
                  <UpdateLanguage
                    language={lang}
                    onClick={getOpenUpdateHandler('')}
                  />
                </Suspense>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default LanguagesTable;
