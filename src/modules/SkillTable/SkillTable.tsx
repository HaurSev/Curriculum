import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useLazySkills } from '../../graphql/queries/skills';
import type { Skill } from 'cv-graphql';
import type { Order, SkillTableProps } from './type';
import {
  StyledTableContainer,
  StyledTableHead,
  SortableTableCell,
  ActionTableCell,
} from './style';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteSkill = lazy(
  () => import('../../components/DeleteSkill/DeleteSkill'),
);

const UpdateSkill = lazy(() => import('../../modules/UpdateSkill/UpdateSkill'));

const SkillTable: React.FC<SkillTableProps> = ({ searchValue }) => {
  const { t } = useTranslation(['skills', 'common']);

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [openUpdateId, setOpenUpdateId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<'name' | 'category'>('name');

  const handleOpenDelete = (id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
  };

  const [getSkills, { loading, data: skillsData }] = useLazySkills();

  const loadSkills = async () => {
    try {
      const response = await getSkills({
        variables: {},
      });

      if (!response.data) return;
      if (!response.data.skills) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const filteredSkills = useMemo(() => {
    if (!skillsData) return [];
    if (!searchValue) return skillsData.skills;

    const lowerSearch = searchValue.toLowerCase();

    return skillsData.skills.filter((skill: Skill) => {
      const lowerName = skill.name.toLowerCase();
      return lowerName.includes(lowerSearch);
    });
  }, [skillsData, searchValue]);

  const sortedSkills = useMemo(() => {
    if (!filteredSkills) return [];
    if (!orderBy) return filteredSkills;

    return [...filteredSkills].sort((a, b) => {
      let aValue = '';
      let bValue = '';

      switch (orderBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'category':
          aValue = a.category?.name ?? '';
          bValue = b.category?.name ?? '';
          break;
        default:
          aValue = '';
          bValue = '';
      }

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredSkills, order, orderBy]);

  const handleSort = (property: 'name' | 'category') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <StyledTableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
              >
                {t('skills:skill')}
              </TableSortLabel>
            </SortableTableCell>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderBy === 'category' ? order : 'asc'}
                onClick={() => handleSort('category')}
              >
                {t('skills:category')}
              </TableSortLabel>
            </SortableTableCell>
            <TableCell></TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {sortedSkills.map((skill, index) => (
            <TableRow key={skill.id || index}>
              <TableCell onClick={() => handleOpenUpdate(skill.id)}>
                {skill.name}
              </TableCell>
              <TableCell>{skill.category?.name}</TableCell>
              <ActionTableCell onClick={() => handleOpenDelete(skill.id)}>
                <DeleteForeverIcon />
              </ActionTableCell>
              {openDeleteId === skill.id && (
                <Suspense>
                  <DeleteSkill
                    skill={skill}
                    onClick={() => setOpenDeleteId(null)}
                  />
                </Suspense>
              )}
              {openUpdateId === skill.id && (
                <Suspense>
                  <UpdateSkill
                    skill={skill}
                    onClick={() => setOpenUpdateId(null)}
                  />
                </Suspense>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SkillTable;
