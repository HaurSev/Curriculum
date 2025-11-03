import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useLazyUser } from '../../graphql/queries/user';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '../../theme/theme';
import type { Cv } from 'cv-graphql';
import DeleteCV from '../DeleteCV/DeleteCV';

interface UserCVsTableProps {
  // onClick: () => void;
  searchValue?: string;
  cvs: Cv[];
}

type Order = 'asc' | 'desc';

const UserCVsTable: React.FC<UserCVsTableProps> = ({
  //   onClick,
  searchValue,
  cvs,
}) => {
  const { t } = useTranslation(['common', 'CVs']);

  const [isDeleteOpen, setDelete] = useState(false);

  const handleSetDelete = () => {
    setDelete(!isDeleteOpen);
  };

  const [order, setOrder] = useState<Order>('asc');

  const filteredCVs = useMemo(() => {
    if (!cvs) return [];
    if (!searchValue) return cvs;

    const lowerSearch = searchValue.toLowerCase();

    return cvs.filter((cv) => {
      const cvName = cv.name.toLowerCase() || '';
      const cvDescription = cv.description?.toLowerCase() || '';
      return (
        cvName.includes(lowerSearch) || cvDescription.includes(lowerSearch)
      );
    });
  }, [cvs, searchValue]);

  const sortedCVs = useMemo(() => {
    if (!filteredCVs) return [];

    return [...filteredCVs].sort((a, b) => {
      const aValue = a.name;
      const bValue = b.name;

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredCVs, order]);

  const handleSort = () => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ background: 'transparent' }}
      elevation={0}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
        aria-label="sortable table"
      >
        <TableHead
          sx={{
            height: 60,
            textTransform: 'capitalize',
          }}
        >
          <TableRow>
            <TableCell align="left" onClick={handleSort}>
              {t('CVs:cvName')}
            </TableCell>
            <TableCell align="left">{t('CVs:education')}</TableCell>
            <TableCell align="left">{t('CVs:employee')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCVs.map((cv, index) => (
            <React.Fragment key={cv.id || index}>
              {isDeleteOpen && (
                <DeleteCV cv={cv} onClick={handleSetDelete}></DeleteCV>
              )}
              <TableRow
                sx={{
                  '& td, & th': {
                    borderBottom: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(107,36,36,0.08)',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell align="left">{cv.name}</TableCell>
                <TableCell align="left">{cv.education}</TableCell>
                <TableCell align="left">
                  {cv.user?.email ||
                    cv.user?.profile?.first_name ||
                    t('notFound')}
                </TableCell>
                <TableCell align="left">
                  <MoreVertIcon onClick={handleSetDelete} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{
                    color: theme.palette.text.disabled,
                    textAlign: 'justify',
                  }}
                >
                  {cv.description}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserCVsTable;
