import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { Bounce, toast } from 'react-toastify';
import {
  Box,
  LinearProgress,
  Typography,
  CircularProgress,
  styled,
} from '@mui/material';
import { Stack } from '@mui/system';
import type { Cv, SkillMastery } from 'cv-graphql';
import theme from '../../theme/theme';
import checkedItemStore from '../../store/checkedItemStore';

const UpdateCvSkill = lazy(
  () => import('../../modules/UpdateCvSkill/UpdateCvSkill'),
);

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '80%',
  gap: theme.spacing(4),
}));

const CategoryBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
}));

const SkillsRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  gap: '10%',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

const Content = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(7),
  padding: theme.spacing(3),
  cursor: 'pointer',
  height: theme.spacing(10),
  marginBottom: theme.spacing(3),
  transition: '0.3s ease',
}));

const CheckedContent = styled(Content)(() => ({
  background: 'rgba(107, 36, 36, 0.21)',
  borderRadius: theme.spacing(10),
  boxShadow: `5px 3px rgba(33, 29, 29, 0.32)`,
}));

interface SkillBlockProps {
  cv: Cv;
}

interface SkillBodyProps {
  skill: SkillMastery;
  progress: {
    value: number;
    className: string;
  };
  userId: string;
}

const getMasteryProgress = (mastery: string) => {
  const masteryMap = {
    Novice: { value: 20, className: 'novice' },
    Advanced: { value: 40, className: 'advanced' },
    Competent: { value: 60, className: 'competent' },
    Proficient: { value: 80, className: 'proficient' },
    Expert: { value: 100, className: 'expert' },
  };
  return (
    masteryMap[mastery as keyof typeof masteryMap] || {
      value: 0,
      className: 'unknown',
    }
  );
};

const SkillBody: React.FC<SkillBodyProps> = ({ skill, progress, userId }) => {
  const userData = JSON.parse(sessionStorage.getItem('user') || '');

  const checkedItems = checkedItemStore((state) => state.checkedItems);

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  let isChecked = checkedItems.some((item) => item.name === skill.name);

  const addItem = checkedItemStore((state) => state.addItem);
  const removeItem = checkedItemStore((state) => state.removeItem);

  const handleCheckItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userData) return;

    if (userId === userData.id || userData.role === 'Admin') {
      if (isChecked) removeItem(skill.name);
      else addItem(skill);
      isChecked = !isChecked;
    }
  };

  const toggleUpdate = () => setUpdateOpen(!isUpdateOpen);

  const SkillContainer = isChecked ? CheckedContent : Content;

  return (
    <SkillContainer onContextMenu={handleCheckItem} onClick={toggleUpdate}>
      <LinearProgress
        className={progress.className}
        variant="determinate"
        value={progress.value}
        sx={{ width: '120px' }}
      />
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.disabled, fontSize: 15 }}
      >
        {skill.name || '(No name)'}
      </Typography>
      {(userId === userData?.id || userData?.role === 'Admin') &&
        isUpdateOpen && (
          <Suspense fallback={<CircularProgress size={20} />}>
            <UpdateCvSkill onClick={toggleUpdate} userSkill={skill} />
          </Suspense>
        )}
    </SkillContainer>
  );
};

const SkillContent: React.FC<{ skills: SkillMastery[]; userId: string }> = ({
  skills,
  userId,
}) => (
  <SkillsRow>
    {skills.map((skill) => {
      const progress = getMasteryProgress(skill.mastery);
      return (
        <SkillBody
          key={`${skill.name}-${skill.categoryId}`}
          skill={skill}
          progress={progress}
          userId={userId}
        />
      );
    })}
  </SkillsRow>
);

const CvSkillsBlock: React.FC<SkillBlockProps> = ({ cv }) => {
  const [loadSkillCategories, { loading, data }] = useLazySkillCategories();

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
    <Container>
      {data?.skillCategories.map((sc) => {
        const categorySkills = cv.skills.filter((s) => s.categoryId === sc.id);
        if (categorySkills.length === 0) return null;
        return (
          <CategoryBlock key={sc.id}>
            <Typography variant="h5">{sc.name}</Typography>
            <SkillContent skills={categorySkills} userId={cv.user?.id || ''} />
          </CategoryBlock>
        );
      })}
    </Container>
  );
};

export default CvSkillsBlock;
