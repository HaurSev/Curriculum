import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TableBody, TableRow, TableSortLabel } from '@mui/material';
import type { CvProject } from 'cv-graphql';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import {
  CustomTable,
  CustomTableCell,
  CustomTableContainer,
  CustomTableHead,
  CustomTableRow,
  TableCellDescrition,
} from './ProjectsTable';

interface UserProjectsTableProps {
  searchValue?: string;
  projects: CvProject[];
}

type Order = 'asc' | 'desc';

const ProjectsTable: React.FC<UserProjectsTableProps> = ({
  searchValue,
  projects,
}) => {
  const { t } = useTranslation(['common', 'CVs', 'projects']);
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order>('asc');

  //  const [loadProjects, { loading }] = useLazyProjects();
  // const [projects, setProjects] = useState<Project[]>([]);

  // const getProjects = async () => {
  //   try {
  //     const result = await loadProjects();
  //     if (!result.data?.projects) return;

  //     setProjects(result.data.projects);
  //   } catch (error) {
  //     toast.error(`${error}`, {
  //       position: 'top-center',
  //       autoClose: 5000,
  //       theme: 'dark',
  //       transition: Bounce,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getProjects();
  // }, [loadProjects]);

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
            <CustomTableCell>{t('projects:stratDate')}</CustomTableCell>
            <CustomTableCell>{t('projects:endDate')}</CustomTableCell>
            <CustomTableCell></CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {sortedProjects.map((project, index) => {
            return (
              <React.Fragment key={project.id || index}>
                <CustomTableRow
                  onContextMenu={(event) => {
                    event.preventDefault();
                  }}
                >
                  <CustomTableCell>{project.name}</CustomTableCell>
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
                  <CustomTableCell
                    onClick={() =>
                      navigate(
                        AppRoutes.Cvs.Children.Details.Create(project.id),
                      )
                    }
                  >
                    <MoreVertIcon />
                  </CustomTableCell>
                </CustomTableRow>

                <TableRow>
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
