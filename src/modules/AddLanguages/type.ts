import type { LanguageProficiency } from 'cv-graphql';
import * as z from 'zod';

export interface AddLanguageProps {
  onClick: () => void;
  userLanguages: LanguageProficiency[];
}

export interface AddLangugeForm {
  userId: string;
  name: string;
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

export const AddLanguageSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty(),
  proficiency: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']),
});
