import type { Cv } from 'cv-graphql';

export interface UserCVsTableProps {
  searchValue?: string;
  cvs: Cv[];
}

export type Order = 'asc' | 'desc';
