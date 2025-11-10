import type { Cv } from 'cv-graphql';
import * as z from 'zod';

export interface UpdateCvProps {
  cv: Cv;
}

export const CreateCVSchema = z.object({
  name: z.string(),
  education: z.string().optional(),
  description: z.string().nonempty(),
  cvId: z.string().optional(),
});

export interface CreateCVData {
  name: string;
  education?: string;
  description: string;
  cvId?: string;
}
