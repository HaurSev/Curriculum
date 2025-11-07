import type { CvProject } from 'cv-graphql';

export interface UserProjectsTableProps {
  searchValue?: string;
  projects: CvProject[];
}

export type Order = 'asc' | 'desc';
