import { Box, LinearProgress, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import type { SkillMastery } from 'cv-graphql';
import React, { lazy, Suspense, useState } from 'react';
import theme from '../../theme/theme';

const UpdateSkill = lazy(() => import('../../modules/UpdateSkill/UpdateSkill'));

const Block = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  gap: '10%',
  flexWrap: 'wrap',
}));

const Content = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(7),
  padding: theme.spacing(5),
  cursor: 'pointer',
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
  const [isUpdateOpen, setUpdateOpen] = useState(false);

  return (
    <Content onClick={() => setUpdateOpen(true)}>
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

      {isUpdateOpen && (
        <Suspense>
          <UpdateSkill onClick={() => setUpdateOpen(false)} userSkill={skill} />
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
