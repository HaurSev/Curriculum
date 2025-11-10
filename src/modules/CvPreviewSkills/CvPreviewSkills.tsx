import React, { useEffect } from 'react';
import { type CvPreviewSkillsProps } from './type';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { Bounce, toast } from 'react-toastify';

const CvPreviewSkills: React.FC<CvPreviewSkillsProps> = ({ skills }) => {
  const [loadSkillCategories, { loading, data: categoriesData }] =
    useLazySkillCategories();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await loadSkillCategories();
        if (!response.data?.skillCategories) return;
      } catch (error) {
        toast.error(`${error}`, {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
          transition: Bounce,
        });
      }
    };
    fetchCategories();
  }, [loadSkillCategories]);

  if (loading) return <CircularProgress />;

  return (
    <>
      {categoriesData?.skillCategories.map((category) => {
        const categorySkills = skills.filter(
          (s) => s.categoryId === category.id,
        );
        if (categorySkills?.length === 0) return null;

        return (
          <Stack>
            <Typography variant="h5" fontWeight={700}>
              {category.name}
            </Typography>
            <Typography>
              {categorySkills?.map((skill) => skill.name).join(', ')}
            </Typography>
          </Stack>
        );
      })}
    </>
  );
};

export default CvPreviewSkills;
