import type { Cv } from 'cv-graphql';

export interface UserCVsTableProps {
  searchValue?: string;
  cvs: Cv[];
  onUpdated?: (cv: Cv) => void;
  onDelete?: () => void;
}

export type Order = 'asc' | 'desc';
