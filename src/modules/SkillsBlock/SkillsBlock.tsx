import React, { useEffect } from 'react';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { Bounce, toast } from 'react-toastify';
import { CircularProgress, Typography } from '@mui/material';
import SkillContent from '../../components/SkillContent/SkillContent';
import { Block, Container } from './style';
import type { SkilBlockProps } from './type';

const SkillsBlock: React.FC<SkilBlockProps> = ({ skills }) => {
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
    return <CircularProgress></CircularProgress>;
  }

  return (
    <Container>
      {data?.skillCategories.map(
        (sc) =>
          skills.filter((s) => s.categoryId === sc.id).length > 0 && (
            <Block key={sc.id}>
              <Typography variant="h5">{sc.name}</Typography>
              <SkillContent
                skills={skills.filter((s) => s.categoryId === sc.id)}
              />
            </Block>
          ),
      )}
    </Container>
  );
};

export default SkillsBlock;
