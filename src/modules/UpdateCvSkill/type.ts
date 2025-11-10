import type { SkillMastery } from 'cv-graphql';
import * as z from 'zod';

export interface UpdateSkillProps {
  onClick: () => void;
  userSkill: SkillMastery;
}

export interface UpdateSkillData {
  cvId: string;
  name: string;
  mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
}

export const UpdateSkillSchema = z.object({
  cvId: z.string(),
  name: z.string().nonempty(),
  mastery: z.enum(['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']),
});
