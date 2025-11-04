import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyLanguages } from '../../graphql/queries/languages';
import { Bounce, toast } from 'react-toastify';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '../../theme/theme';

const DeleteLanguage = lazy(
  () => import('../../components/DeleteLanguage/DeleteLanguage'),
);

const UpdateLanguage = lazy(
  () => import('../../modules/UpdateLanguage/UpdateLanguage'),
);

type Order = 'asc' | 'desc';

interface LanguagesTableProps {
  searchValue?: string;
}

const LanguagesTable: React.FC<LanguagesTableProps> = ({ searchValue }) => {
  const { t } = useTranslation(['languages', 'common']);

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

  const handleOpenDelete = (id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  };

  const [openUpdateId, setOpenUpdateId] = useState<string | null>(null);

  const handleOpenUpdate = (id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
  };

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

  const [order, setOrder] = useState<Order>('asc');

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

  if (loading) return <Button variant="text" loading={loading}></Button>;
  return (
    <TableContainer
      sx={{
        padding: theme.spacing(5),
      }}
    >
      <Table>
        <TableHead
          sx={{
            height: 60,
            textTransform: 'capitalize',
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                cursor: 'pointer !important',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <TableSortLabel onClick={handleSort}>{t('name')}</TableSortLabel>
            </TableCell>
            <TableCell>{t('nativeName')}</TableCell>
            <TableCell>{t('iso')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((lang, index) => (
            <TableRow key={lang.id || index}>
              <TableCell onClick={() => handleOpenUpdate(lang.id)}>
                {lang.name}
              </TableCell>
              <TableCell>{lang.native_name}</TableCell>
              <TableCell>{lang.iso2}</TableCell>
              <TableCell onClick={() => handleOpenDelete(lang.id)}>
                <MoreVertIcon />
              </TableCell>{' '}
              {openDeleteId === lang.id && (
                <Suspense>
                  <DeleteLanguage
                    language={lang}
                    onClick={() => setOpenDeleteId(null)}
                  />
                </Suspense>
              )}
              {openUpdateId === lang.id && (
                <Suspense>
                  <UpdateLanguage
                    language={lang}
                    onClick={() => setOpenUpdateId(null)}
                  />
                </Suspense>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LanguagesTable;
