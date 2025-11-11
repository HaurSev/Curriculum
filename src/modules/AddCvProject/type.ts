import * as z from 'zod';

export interface AddCVProjectData {
  cvId: string;
  projectId: string;
  startDate: string;
  endDate: string;
  roles: string[];
  responsibilities: string[];
}

export const AddCvProjectSchema = z
  .object({
    cvId: z.string().nonempty(),
    projectId: z.string().nonempty(),
    startDate: z.string().nonempty(),
    endDate: z.string().nonempty(),
    roles: z.array(z.string()),
    responsibilities: z.array(z.string()),
  })
  .refine(
    (data) =>
      !data.endDate || new Date(data.endDate) >= new Date(data.startDate),
    {
      message: 'End date cannot be earlier than start date',
      path: ['endDate'],
    },
  );

export interface AddCvProjectProps {
  onClick: () => void;
  onSuccess: () => void;
}
