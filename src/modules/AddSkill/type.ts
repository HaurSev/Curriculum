import type { Skill } from 'cv-graphql';
import * as z from 'zod';

export interface AddSkillProps {
  onClick: () => void;
}

export interface AddSkillData {
  userId: string;
  skill?: Skill;
  categoryId?: string;
  name: string;
  mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
}

export const AddSkillSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty(),
  mastery: z.enum(['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']),
  categoryId: z.string().optional(),
});

export const masteryKeys = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];
