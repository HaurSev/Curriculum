import type { Skill } from 'cv-graphql';
import * as z from 'zod';

export interface UpdateSkillProps {
  onClick: () => void;
  skill: Skill;
}

export interface UpdateSkillForm {
  skillId: string;
  name: string;
  categoryId: string;
}

export const UpdateSkillSchema = z.object({
  name: z.string().nonempty(),
  skillId: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});
