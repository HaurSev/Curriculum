import { Box, LinearProgress, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import type { SkillMastery } from 'cv-graphql';
import React, { lazy, Suspense, useState } from 'react';
import theme from '../../theme/theme';
import checkedItemStore from '../../store/checkedItemStore';
import { useParams } from 'react-router-dom';

const UpdateSkill = lazy(() => import('../../modules/UpdateSkill/UpdateSkill'));

const Block = styled(Box)(() => ({
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
  padding: theme.spacing(5),
  cursor: 'pointer',
  height: theme.spacing(4),
  marginBottom: theme.spacing(5),
  transition: '0.8s ease',
}));

const CheckedContent = styled(Content)(() => ({
  background: 'rgba(107, 36, 36, 0.21)',
  borderRadius: theme.spacing(10),
  boxShadow: `5px 3px rgba(33, 29, 29, 0.32)`,
}));

interface SkillContentProps {
  skills: SkillMastery[];
}
interface SkillBodyProps {
  skill: SkillMastery;
  progress: {
    value: number;
    className: string;
  };
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
      value: 100,
      className: 'expert',
    }
  );
};

const SkillBody: React.FC<SkillBodyProps> = ({ skill, progress }) => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isChecked, setCheck] = useState(false);

  const addItem = checkedItemStore((state) => state.addItem);
  const removeItem = checkedItemStore((state) => state.removeItem);

  const handleCheckItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userId === userData.id || userData.role === 'Admin') {
      if (isChecked) {
        removeItem(skill.name);
      } else {
        addItem(skill);
      }
      setCheck(!isChecked);
    }
  };

  const handlSetUpdateOpen = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  return isChecked ? (
    <CheckedContent onContextMenu={handleCheckItem}>
      <LinearProgress
        className={progress.className}
        variant="determinate"
        value={progress.value}
      />
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.disabled,
          fontSize: 15,
        }}
      >
        {skill.name}
      </Typography>
    </CheckedContent>
  ) : (
    <Content onClick={handlSetUpdateOpen} onContextMenu={handleCheckItem}>
      <LinearProgress
        className={progress.className}
        variant="determinate"
        value={progress.value}
      />
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.disabled,
          fontSize: 15,
        }}
      >
        {skill.name}
      </Typography>
      {(userId === userData.id || userData.role === 'Admin') &&
        isUpdateOpen && (
          <Suspense>
            <UpdateSkill onClick={handlSetUpdateOpen} userSkill={skill} />
          </Suspense>
        )}
    </Content>
  );
};

const SkillContent: React.FC<SkillContentProps> = ({ skills }) => {
  return (
    <Block>
      {skills.map((skill) => {
        const progress = getMasteryProgress(skill.mastery);
        return <SkillBody key={skill.name} skill={skill} progress={progress} />;
      })}
    </Block>
  );
};

export default SkillContent;
