import { Box, LinearProgress, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import type { SkillMastery } from 'cv-graphql';
import React from 'react';
import theme from '../../theme/theme';

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
  gap: theme.spacing(10),
  padding: theme.spacing(5),
}));

interface SkillContentProps {
  skills: SkillMastery[];
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

const SkillContent: React.FC<SkillContentProps> = ({ skills }) => {
  return (
    <Block>
      {skills.map((c) => {
        const progress = getMasteryProgress(c.mastery);
        return (
          <Content key={c.categoryId}>
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
              {c.name}
            </Typography>
          </Content>
        );
      })}
    </Block>
  );
};

export default SkillContent;
