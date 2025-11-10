import * as z from 'zod';

export interface AddCVProps {
  onClick: () => void;
}

export const CreateCVSchema = z.object({
  name: z.string(),
  education: z.string().optional(),
  description: z.string().nonempty(),
  userId: z.string().optional(),
});
export interface CreateCVData {
  name: string;
  education?: string;
  description: string;
  userId?: string;
}
