import type { CvProject } from 'cv-graphql';

export interface UserProjectsTableProps {
  searchValue?: string;
  projects: CvProject[];
  userId: string;
}

export type Order = 'asc' | 'desc';
