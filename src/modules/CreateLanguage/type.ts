import * as z from 'zod';

export interface CreateLanguageProps {
  onClick: () => void;
}

export interface CreateLangugeForm {
  name: string;
  native_name: string;
  iso: string;
}

export const CreateLanguageSchema = z.object({
  name: z.string().nonempty(),
  native_name: z.string().nonempty(),
  iso: z.string().nonempty(),
});
