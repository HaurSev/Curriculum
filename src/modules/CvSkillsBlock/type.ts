import type { Cv, SkillMastery } from 'cv-graphql';

export interface SkillBlockProps {
  cv: Cv;
}

export interface SkillBodyProps {
  skill: SkillMastery;
  progress: {
    value: number;
    className: string;
  };
  userId: string;
}

export const getMasteryProgress = (mastery: string) => {
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
