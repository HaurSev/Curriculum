import type { UserData } from '../../graphql/queries/users';
import * as z from 'zod';
export interface UpdateProfileProps {
  onClick: () => void;
  user: UserData;
  onSuccess: () => void;
}

export type UpdateProfileData = {
  userId: string;
  firstName: string;
  lastName: string;
};

export type DepartmentType = {
  id: string;
  name: string;
};
export type PositionsType = {
  id: string;
  name: string;
};

export const UpdateProfileSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
