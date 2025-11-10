import React, { lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableBody, TableRow, TableSortLabel } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
  () => import('../../components/DeleteCvProject/DeleteCvProject.tsx'),
);
const UpdateCvProject = lazy(
  () => import('../../modules/UpdateCvProject/UpdateCvProject.tsx'),
);

const ProjectsTable: React.FC<UserProjectsTableProps> = ({
  searchValue,
  projects,
  userId,
}) => {
  const { t } = useTranslation(['common', 'CVs', 'projects']);
  const [order, setOrder] = useState<Order>('asc');
  const userData = sessionStorage.getItem('user');
  const user = JSON.parse(userData || '');

  const [isDeleteId, setDeleteId] = useState('');
  const handleClearDeleteId = () => {
    setDeleteId('');
  };

  const [isUpdateId, setUpdateId] = useState('');
  const handleClearUpdateId = () => {
    setUpdateId('');
  };

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
              <TableSortLabel onClick={() => handleSort()}>
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
          {sortedProjects.map((project, index) => {
            return (
              <React.Fragment key={project.id || index}>
                {isDeleteId === project.id &&
                  user.role === 'Admin' &&
                  user.id === userId && (
                    <Suspense>
                      <DeleteCvProject
                        onClick={handleClearDeleteId}
                        projectId={project.project.id}
                        projectName={project.name}
                      />
                    </Suspense>
                  )}
                {isUpdateId === project.id &&
                  user.role === 'Admin' &&
                  user.id === userId && (
                    <Suspense>
                      <UpdateCvProject
                        onClick={handleClearUpdateId}
                        project={project}
                      ></UpdateCvProject>
                    </Suspense>
                  )}
                <CustomTableRow>
                  <CustomTableCell onClick={() => setUpdateId(project.id)}>
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
                  <CustomTableCell onClick={() => setDeleteId(project.id)}>
                    <MoreVertIcon />
                  </CustomTableCell>
                </CustomTableRow>

                <TableRow onClick={() => setUpdateId(project.id)}>
                  <TableCellDescrition colSpan={6}>
                    {project.description}
                  </TableCellDescrition>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </CustomTable>
    </CustomTableContainer>
  );
};

export default ProjectsTable;
