import type { CvProject } from 'cv-graphql';
import * as z from 'zod';

export interface UpdateCvProjectData {
  cvId: string;
  projectId: string;
  startDate: string;
  endDate: string;
  roles: string[];
  responsibilities: string[];
}

export const UpdateCvProjectSchema = z
  .object({
    cvId: z.string().nonempty(),
    projectId: z.string().nonempty(),
    startDate: z.string().nonempty(),
    endDate: z.string().nonempty(),
    roles: z.array(z.string()),
    responsibilities: z.array(z.string()),
  })
  .refine((data) => new Date(data.startDate) <= new Date(), {
    message: 'Start date should be earlier than today',
    path: ['startDate'],
  })
  .refine((data) => new Date(data.endDate) <= new Date(), {
    message: 'End date cannot be earlier than today',
    path: ['startDate'],
  })
  .refine(
    (data) =>
      !data.endDate || new Date(data.endDate) >= new Date(data.startDate),
    {
      message: 'End date cannot be earlier than start date',
      path: ['endDate'],
    },
  );

export interface UpdateCvProjectProps {
  onClick: () => void;
  project: CvProject;
}
