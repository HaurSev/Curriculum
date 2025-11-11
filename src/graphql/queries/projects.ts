import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { Project } from 'cv-graphql';

export const PROJECTS = gql`
  query Projects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
      description
    }
  }
`;

export interface ProjectsQueryData {
  projects: Project[];
}

export const useLazyProjects = () => {
  return useLazyQuery<ProjectsQueryData>(PROJECTS);
};
