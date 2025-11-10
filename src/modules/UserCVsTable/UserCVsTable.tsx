import React, { lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import type { Order, UserCVsTableProps } from './type.ts';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  DescriptionTableRow,
  DescriptionTableCell,
  ActionTableCell,
  MoreIcon,
  SortableTableCell,
} from './style';
import { TableBody, TableCell, TableSortLabel } from '@mui/material';

const DeleteCV = lazy(() => import('../DeleteCV/DeleteCV.tsx'));
const UpdateCV = lazy(() => import('../UpdateCV/UpdateCV.tsx'));

const UserCVsTable: React.FC<UserCVsTableProps> = ({ searchValue, cvs }) => {
  const { t } = useTranslation(['common', 'CVs']);

  const navigate = useNavigate();

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [openUpdateId, setOpenUpdateId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<'name' | 'employee'>('name');

  const handleOpenDelete = (id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
  };

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
      let aValue = '';
      let bValue = '';

      switch (orderBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'employee':
          aValue = a.user?.email ?? '';
          bValue = b.user?.email ?? '';
          break;
        default:
          aValue = '';
          bValue = '';
      }

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredCVs, order, orderBy]);

  const handleSort = (property: 'name' | 'employee') => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <StyledTableContainer>
      <StyledTable aria-label="sortable table">
        <StyledTableHead>
          <StyledTableRow>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
              >
                {t('CVs:cvName')}
              </TableSortLabel>
            </SortableTableCell>
            <SortableTableCell>{t('CVs:education')}</SortableTableCell>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'employee'}
                direction={orderBy === 'employee' ? order : 'asc'}
                onClick={() => handleSort('employee')}
              />
              {t('CVs:employee')}
            </SortableTableCell>
            <TableCell></TableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {sortedCVs.map((cv, index) => {
            return (
              <React.Fragment key={cv.id || index}>
                {openDeleteId === cv.id && (
                  <Suspense>
                    <DeleteCV cv={cv} onClick={() => handleOpenDelete('')} />
                  </Suspense>
                )}
                {openUpdateId === cv.id && (
                  <Suspense>
                    <UpdateCV cv={cv} onClick={() => handleOpenUpdate('')} />
                  </Suspense>
                )}
                <StyledTableRow
                  onContextMenu={(event) => {
                    event.preventDefault();
                    handleOpenDelete(cv.id);
                  }}
                  onClick={() => handleOpenUpdate(cv.id)}
                >
                  <TableCell align="left">{cv.name}</TableCell>
                  <TableCell align="left">{cv.education}</TableCell>
                  <TableCell align="left">
                    {cv.user?.email || t('notFound')}
                  </TableCell>
                  <ActionTableCell
                    onClick={() =>
                      navigate(AppRoutes.Cvs.Children.Details.Create(cv.id))
                    }
                  >
                    <MoreIcon />
                  </ActionTableCell>
                </StyledTableRow>

                <DescriptionTableRow
                  onClick={() => handleOpenUpdate(cv.id)}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    handleOpenDelete(cv.id);
                  }}
                >
                  <DescriptionTableCell
                    colSpan={4}
                    onClick={() =>
                      navigate(AppRoutes.Cvs.Children.Details.Create(cv.id))
                    }
                  >
                    {cv.description}
                  </DescriptionTableCell>
                </DescriptionTableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default UserCVsTable;
