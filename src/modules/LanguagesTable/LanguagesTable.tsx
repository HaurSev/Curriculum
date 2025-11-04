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
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyLanguages } from '../../graphql/queries/languages';
import { Bounce, toast } from 'react-toastify';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useNavigate } from 'react-router-dom';

type Order = 'asc' | 'desc';

interface LanguagesTableProps {
  //   onClick: () => void;
  searchValue?: string;
}

const LanguagesTable: React.FC<LanguagesTableProps> = ({
  searchValue,
  //   onClick,
}) => {
  const { t } = useTranslation(['languages', 'common']);

  //   const navigate = useNavigate();

  //   const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  //   const userId = user.id;

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
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            height: 60,
            textTransform: 'capitalize',
          }}
        >
          <TableRow>
            <TableCell>
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
              <TableCell>{lang.name}</TableCell>
              <TableCell>{lang.native_name}</TableCell>
              <TableCell>{lang.iso2}</TableCell>
              <TableCell>
                <MoreVertIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LanguagesTable;
