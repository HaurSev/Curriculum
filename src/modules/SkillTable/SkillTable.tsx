import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

  const [getSkills, { loading, data: skillsData }] = useLazySkills();

  const loadSkills = useCallback(async () => {
    try {
      const response = await getSkills({ variables: {} });
      if (!response.data?.skills) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  }, [getSkills]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const handleSort = useCallback(
    (property: 'name' | 'category') => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy],
  );

  const getSortHandler = useCallback(
    (property: 'name' | 'category') => () => handleSort(property),
    [handleSort],
  );

  const handleOpenDelete = useCallback((id: string) => {
    setOpenDeleteId((prev) => (prev === id ? null : id));
  }, []);

  const handleOpenUpdate = useCallback((id: string) => {
    setOpenUpdateId((prev) => (prev === id ? null : id));
  }, []);

  const getOpenDeleteHandler = useCallback(
    (id: string) => () => handleOpenDelete(id),
    [handleOpenDelete],
  );

  const getOpenUpdateHandler = useCallback(
    (id: string) => () => handleOpenUpdate(id),
    [handleOpenUpdate],
  );

  const handleCloseDelete = useCallback(() => {
    setOpenDeleteId(null);
  }, []);

  const handleCloseUpdate = useCallback(() => {
    setOpenUpdateId(null);
  }, []);

  const filteredSkills = useMemo(() => {
    if (!skillsData) return [];
    if (!searchValue) return skillsData.skills;
    const lowerSearch = searchValue.toLowerCase();
    return skillsData.skills.filter((skill: Skill) =>
      skill.name.toLowerCase().includes(lowerSearch),
    );
  }, [skillsData, searchValue]);

  const sortedSkills = useMemo(() => {
    if (!filteredSkills) return [];
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
      }
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredSkills, order, orderBy]);

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
                onClick={getSortHandler('name')}
              >
                {t('skills:skill')}
              </TableSortLabel>
            </SortableTableCell>
            <SortableTableCell>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderBy === 'category' ? order : 'asc'}
                onClick={getSortHandler('category')}
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
              <TableCell onClick={getOpenUpdateHandler(skill.id)}>
                {skill.name}
              </TableCell>
              <TableCell>{skill.category?.name}</TableCell>
              <ActionTableCell onClick={getOpenDeleteHandler(skill.id)}>
                <DeleteForeverIcon />
              </ActionTableCell>

              {openDeleteId === skill.id && (
                <Suspense>
                  <DeleteSkill skill={skill} onClick={handleCloseDelete} />
                </Suspense>
              )}
              {openUpdateId === skill.id && (
                <Suspense>
                  <UpdateSkill skill={skill} onClick={handleCloseUpdate} />
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
