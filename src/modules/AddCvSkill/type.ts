import * as z from 'zod';

export const masteryKeys = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];

export interface AddSkillData {
  cvId: string;
  categoryId?: string;
  name: string;
  mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
}

export const AddSkillSchema = z.object({
  cvId: z.string(),
  name: z.string().nonempty(),
  mastery: z.enum(['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']),
  categoryId: z.string().optional(),
});

export interface AddSkillProps {
  onClick: () => void;
}
