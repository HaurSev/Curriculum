import * as z from 'zod';
export type DepartmentType = {
  id: string;
  name: string;
};

export type PositionsType = {
  id: string;
  name: string;
};

export interface UpdateUserProfileProps {
  userId: string;
  first_name: string;
  last_name: string;
  position_name: string;
  department_name: string;
  onUpdate: () => void;
}

export interface UpdatePositionDepartmentDate {
  userId: string;
  positionId: string;
  departmentId: string;
}

export const UpdatePositionDepartmentSchema = z.object({
  userId: z.string(),
  departmentId: z.string(),
  positionId: z.string(),
});
