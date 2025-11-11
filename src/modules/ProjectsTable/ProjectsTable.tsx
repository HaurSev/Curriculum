import React, { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableBody, TableRow, TableSortLabel } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  CustomTable,
  CustomTableCell,
  CustomTableContainer,
  CustomTableHead,
  CustomTableRow,
  TableCellDescrition,
} from './style';
import type { Order, UserProjectsTableProps } from './type.ts';

const DeleteCvProject = lazy(
  () => import('../../components/DeleteCvProject/DeleteCvProject'),
);
const UpdateCvProject = lazy(
  () => import('../../modules/UpdateCvProject/UpdateCvProject'),
);

const ProjectsTable: React.FC<UserProjectsTableProps> = ({
  searchValue,
  projects,
  userId,
  onSuccess,
}) => {
  const { t } = useTranslation(['common', 'CVs', 'projects']);
  const [order, setOrder] = useState<Order>('asc');
  const userData = sessionStorage.getItem('user');
  const user = JSON.parse(userData || '');

  const [isDeleteId, setDeleteId] = useState('');

  const [isUpdateId, setUpdateId] = useState('');

  const handleOpenUpdate = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUpdateId(id);
  }, []);

  const handleOpenDelete = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const handleClearDeleteId = useCallback(() => {
    setDeleteId('');
  }, []);

  const handleClearUpdateId = useCallback(() => {
    setUpdateId('');
  }, []);

  const getOpenUpdateHandler = useCallback(
    (id: string) => (e: React.MouseEvent) => handleOpenUpdate(e, id),
    [handleOpenUpdate],
  );

  const getOpenDeleteHandler = useCallback(
    (id: string) => () => handleOpenDelete(id),
    [handleOpenDelete],
  );

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (!searchValue) return projects;

    const lowerSearch = searchValue.toLowerCase();

    return projects.filter((p) => {
      const cvName = p.name.toLowerCase() || '';
      const cvDescription = p.internal_name?.toLowerCase() || '';
      return (
        cvName.includes(lowerSearch) || cvDescription.includes(lowerSearch)
      );
    });
  }, [projects, searchValue]);

  const sortedProjects = useMemo(() => {
    if (!filteredProjects) return [];

    return [...filteredProjects].sort((a, b) => {
      const aValue = a.name;
      const bValue = b.name;

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredProjects, order]);

  const handleSort = () => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  return (
    <CustomTableContainer>
      <CustomTable>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell>
              <TableSortLabel onClick={handleSort}>
                {t('projects:name')}
              </TableSortLabel>
            </CustomTableCell>
            <CustomTableCell>{t('projects:internalName')}</CustomTableCell>
            <CustomTableCell>{t('projects:domain')}</CustomTableCell>
            <CustomTableCell>{t('projects:startDate')}</CustomTableCell>
            <CustomTableCell>{t('projects:endDate')}</CustomTableCell>
            <CustomTableCell></CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {sortedProjects.map((project, index) => (
            <React.Fragment key={project.id || index}>
              <CustomTableRow>
                <CustomTableCell onClick={getOpenUpdateHandler(project.id)}>
                  {project.name}
                </CustomTableCell>
                <CustomTableCell>
                  {project.internal_name || t('notFound')}
                </CustomTableCell>
                <CustomTableCell>{project.domain}</CustomTableCell>
                <CustomTableCell>
                  {project.start_date || t('notFound')}
                </CustomTableCell>
                <CustomTableCell>
                  {project.end_date || 'until now'}
                </CustomTableCell>
                <CustomTableCell onClick={getOpenDeleteHandler(project.id)}>
                  <DeleteForeverIcon />
                </CustomTableCell>
              </CustomTableRow>

              <TableRow>
                <TableCellDescrition colSpan={6}>
                  {project.description}
                </TableCellDescrition>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </CustomTable>
      {isDeleteId && (userId === user.id || user.role == 'Admin') && (
        <Suspense>
          <DeleteCvProject
            onClick={handleClearDeleteId}
            projectId={
              sortedProjects.find((p) => p.id === isDeleteId)?.project.id || ''
            }
            projectName={
              sortedProjects.find((p) => p.id === isDeleteId)?.name || ''
            }
          />
        </Suspense>
      )}
      {isUpdateId && (userId === user.id || user.role == 'Admin') && (
        <Suspense>
          <UpdateCvProject
            onClick={handleClearUpdateId}
            project={sortedProjects.find((p) => p.id === isUpdateId)!}
            onSuccess={onSuccess}
          />
        </Suspense>
      )}
    </CustomTableContainer>
  );
};

export default ProjectsTable;
