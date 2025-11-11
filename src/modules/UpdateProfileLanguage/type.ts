import type { LanguageProficiency } from 'cv-graphql';
import * as z from 'zod';

export interface UpdateLanguageProps {
  onClick: () => void;
  userLanguage: LanguageProficiency;
}
export const proficiencyKeys = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

export interface UpdateLangugeForm {
  userId: string;
  name: string;
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

export const UpdateLanguageSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty(),
  proficiency: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']),
});
