import type { Skill } from 'cv-graphql';

export interface DeleteSkillProps {
  onClick: () => void;
  skill: Skill;
}
