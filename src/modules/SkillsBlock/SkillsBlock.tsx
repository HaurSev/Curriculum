import React, { useEffect } from 'react';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { Bounce, toast } from 'react-toastify';
import { Button, Typography } from '@mui/material';
import type { SkillMastery } from 'cv-graphql';
import SkillContent from '../../components/SkillContent/SkillContent';
import { Block, Container } from './style';

interface SkilBlockProps {
  skills: SkillMastery[];
}

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
    return <Button variant="text" loading={loading}></Button>;
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
