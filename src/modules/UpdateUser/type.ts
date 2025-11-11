import type { UserData } from '../../graphql/queries/users';
import * as z from 'zod';

export interface UpdateUserProps {
  onClick: () => void;
  user: UserData;
}

export type UpdateFormData = {
  userId: string;
  departmentId?: string;
  positionId?: string;
  role: 'admin' | 'employee';
};

export type DepartmentType = {
  id: string;
  name: string;
};
export type PositionsType = {
  id: string;
  name: string;
};

export const UpdateUserSchema = z.object({
  userId: z.string(),
  departmentId: z.string().optional(),
  positionId: z.string().optional(),
  role: z.enum(['admin', 'employee']),
});
