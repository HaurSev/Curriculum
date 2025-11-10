import * as z from 'zod';

export interface CreateSkillProps {
  onClick: () => void;
}

export interface CreateSkillForm {
  name: string;
  categoryId: string;
}

export const CreateSkillSchema = z.object({
  name: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});
