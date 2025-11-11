import type { UserData } from '../../graphql/queries/users';

export type Order = 'asc' | 'desc';

export interface UserTableProps {
  onClick: (user: UserData) => void;
  searchValue?: string;
  users: UserData[];
}
