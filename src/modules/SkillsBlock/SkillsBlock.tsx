import React, { useEffect } from 'react';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { Bounce, toast } from 'react-toastify';
import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { SkillMastery } from 'cv-graphql';
import SkillContent from '../../components/SkillContent/SkillContent';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '80%',
}));

interface SkilBlockProps {
  skills: SkillMastery[];
}

const SkillsBlock: React.FC<SkilBlockProps> = ({ skills }) => {
  const [t] = useTranslation();
  const [skillCategory, { loading, data }] = useLazySkillCategories();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await skillCategory({
        variables: {},
      });

      if (!response.data) return;
      if (!response.data.skillCategories) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  if (loading) {
    return <Typography>{t('loading')}</Typography>;
  }
  return (
    <Container>
      {data?.skillCategories.map((sc) => (
        <>
          {skills.filter((s) => s.categoryId === sc.id).length > 0 && (
            <>
              <Typography variant="h5">{sc.name}</Typography>
              <SkillContent skills={skills}></SkillContent>
            </>
          )}
        </>
      ))}
    </Container>
  );
};

export default SkillsBlock;
