import type { CvProject } from 'cv-graphql';

export interface UserProjectsTableProps {
  searchValue?: string;
  projects: CvProject[];
  userId: string;
  onSuccess: () => void;
}

export type Order = 'asc' | 'desc';
