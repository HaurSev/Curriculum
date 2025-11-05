import React, { lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import theme from '../../theme/theme';
import type { Cv } from 'cv-graphql';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DeleteCV = lazy(() => import('../DeleteCV/DeleteCV'));
const UpdateCV = lazy(() => import('../UpdateCV/UpdateCV'));

interface UserCVsTableProps {
  searchValue?: string;
  cvs: Cv[];
}

type Order = 'asc' | 'desc';

const UserCVsTable: React.FC<UserCVsTableProps> = ({ searchValue, cvs }) => {
  const { t } = useTranslation(['common', 'CVs']);

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

  const handleOpenDelete = (id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  };

  const [openUpdateId, setOpenUpdateId] = useState<string | null>(null);

  const handleOpenUpdate = (id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
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
            <TableCell align="left">
              <TableSortLabel onClick={handleSort}>
                {t('CVs:cvName')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">{t('CVs:education')}</TableCell>
            <TableCell align="left">{t('CVs:employee')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCVs.map((cv, index) => {
            return (
              <React.Fragment key={cv.id || index}>
                {openDeleteId === cv.id && (
                  <Suspense>
                    <DeleteCV
                      cv={cv}
                      onClick={() => handleOpenDelete('')}
                    ></DeleteCV>
                  </Suspense>
                )}
                {openUpdateId === cv.id && (
                  <Suspense>
                    <UpdateCV
                      cv={cv}
                      onClick={() => handleOpenUpdate('')}
                    ></UpdateCV>
                  </Suspense>
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
                  <TableCell
                    onClick={() => handleOpenUpdate(cv.id)}
                    align="left"
                  >
                    {cv.name}
                  </TableCell>
                  <TableCell align="left">{cv.education}</TableCell>
                  <TableCell align="left">
                    {cv.user?.email || t('notFound')}
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => handleOpenDelete(cv.id)}
                  >
                    <MoreVertIcon />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      color: theme.palette.text.disabled,
                      textAlign: 'justify',
                    }}
                    onClick={() => handleOpenUpdate(cv.id)}
                  >
                    {cv.description}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserCVsTable;
