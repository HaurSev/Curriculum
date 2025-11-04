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
import { Bounce, toast } from 'react-toastify';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '../../theme/theme';
// import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { useLazySkills } from '../../graphql/queries/skills';
import type { Skill } from 'cv-graphql';

type Order = 'asc' | 'desc';

interface SkillTableProps {
  searchValue?: string;
}

const SkillTable: React.FC<SkillTableProps> = ({ searchValue }) => {
  const { t } = useTranslation(['skills', 'common']);

  //   const [skillCategory, { data }] = useLazySkillCategories();

  //   const loadSkillCategory = async () => {
  //     try {
  //       const response = await skillCategory({
  //         variables: {},
  //       });

  //       if (!response.data) return;
  //       if (!response.data.skillCategories) return;
  //     } catch (error) {
  //       toast.error(`${error}`, {
  //         position: 'top-center',
  //         autoClose: 5000,
  //         theme: 'dark',
  //         transition: Bounce,
  //       });
  //     }
  //   };

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

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<'name' | 'category'>('name');
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

  if (loading) return <Button variant="text" loading={loading}></Button>;

  return (
    <TableContainer
      sx={{
        padding: theme.spacing(5),
      }}
    >
      <Table>
        <TableHead
          sx={{
            height: 60,
            textTransform: 'capitalize',
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                cursor: 'pointer !important',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
              >
                {t('skills:skill')}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderBy === 'category' ? order : 'asc'}
                onClick={() => handleSort('category')}
              >
                {t('skills:category')}
              </TableSortLabel>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSkills.map((skill, index) => (
            <TableRow key={skill.id || index}>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.category?.name}</TableCell>
              <TableCell>
                <MoreVertIcon />
              </TableCell>
              {/* {openDeleteId === lang.id && (
                <Suspense>
                  <DeleteLanguage
                    language={lang}
                    onClick={() => setOpenDeleteId(null)}
                  />
                </Suspense>
              )} */}
              {/* {openUpdateId === lang.id && (
                <Suspense>
                  <UpdateLanguage
                    language={lang}
                    onClick={() => setOpenUpdateId(null)}
                  />
                </Suspense>
              )} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkillTable;
