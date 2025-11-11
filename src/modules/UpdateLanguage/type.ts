import type { Language } from 'cv-graphql';
import * as z from 'zod';

export interface UpdateLanguageProps {
  onClick: () => void;
  language: Language;
}

export interface CreateLanguageForm {
  name: string;
  native_name: string;
  iso: string;
}

export const CreateLanguageSchema = z.object({
  name: z.string().nonempty(),
  native_name: z.string().nonempty(),
  iso: z.string().nonempty(),
});
