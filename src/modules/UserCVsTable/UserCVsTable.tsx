import React, { lazy, Suspense, useCallback, useMemo, useState } from 'react';
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

const UserCVsTable: React.FC<UserCVsTableProps> = ({
  searchValue,
  cvs,
  onUpdated,
  onDelete,
}) => {
  const { t } = useTranslation(['common', 'CVs']);
  const navigate = useNavigate();

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [openUpdateId, setOpenUpdateId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<'name' | 'employee'>('name');

  const handleOpenDelete = useCallback((id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  }, []);

  const handleOpenUpdate = useCallback((id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
  }, []);

  const handleCloseDelete = useCallback(() => {
    setOpenDeleteId(null);
  }, []);

  const handleCloseUpdate = useCallback(() => {
    setOpenUpdateId(null);
  }, []);

  const handleSort = useCallback(
    (property: 'name' | 'employee') => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy],
  );

  const getSortHandler = useCallback(
    (property: 'name' | 'employee') => () => handleSort(property),
    [handleSort],
  );

  const getOpenDeleteHandler = useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      handleOpenDelete(id);
    },
    [handleOpenDelete],
  );

  const getOpenUpdateHandler = useCallback(
    (id: string) => () => handleOpenUpdate(id),
    [handleOpenUpdate],
  );

  const getNavigateHandler = useCallback(
    (id: string) => () => navigate(AppRoutes.Cvs.Children.Details.Create(id)),
    [navigate],
  );

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
      }

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredCVs, order, orderBy]);

  return (
    <StyledTableContainer>
      <StyledTable aria-label="sortable table">
        <StyledTableHead>
          <StyledTableRow>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={getSortHandler('name')}
              >
                {t('CVs:cvName')}
              </TableSortLabel>
            </SortableTableCell>
            <SortableTableCell>{t('CVs:education')}</SortableTableCell>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'employee'}
                direction={orderBy === 'employee' ? order : 'asc'}
                onClick={getSortHandler('employee')}
              />
              {t('CVs:employee')}
            </SortableTableCell>
            <TableCell></TableCell>
          </StyledTableRow>
        </StyledTableHead>

        <TableBody>
          {sortedCVs.map((cv, index) => (
            <React.Fragment key={cv.id || index}>
              {openDeleteId === cv.id && (
                <Suspense>
                  <DeleteCV
                    cv={cv}
                    onClick={handleCloseDelete}
                    onDelete={onDelete}
                  />
                </Suspense>
              )}

              {openUpdateId === cv.id && (
                <Suspense>
                  <UpdateCV
                    cv={cv}
                    onClick={handleCloseUpdate}
                    onUpdated={onUpdated}
                  />
                </Suspense>
              )}

              <StyledTableRow
                onContextMenu={getOpenDeleteHandler(cv.id)}
                onClick={getOpenUpdateHandler(cv.id)}
              >
                <TableCell align="left">{cv.name}</TableCell>
                <TableCell align="left">{cv.education}</TableCell>
                <TableCell align="left">
                  {cv.user?.email || t('notFound')}
                </TableCell>
                <ActionTableCell onClick={getNavigateHandler(cv.id)}>
                  <MoreIcon />
                </ActionTableCell>
              </StyledTableRow>

              <DescriptionTableRow
                onClick={getOpenUpdateHandler(cv.id)}
                onContextMenu={getOpenDeleteHandler(cv.id)}
              >
                <DescriptionTableCell
                  colSpan={4}
                  onClick={getNavigateHandler(cv.id)}
                >
                  {cv.description}
                </DescriptionTableCell>
              </DescriptionTableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default UserCVsTable;
