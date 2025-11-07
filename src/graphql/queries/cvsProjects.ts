import { gql } from '@apollo/client';
import type { Cv } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const CV_PROJECTS = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      projects {
        id
        project
        name
        internal_name
        description
        domain
        start_date
        end_date
      }
      user {
        id
      }
    }
  }
`;

export type CvArgs = {
  cvId: string;
};

export type CvProjectsResult = {
  cv: Cv;
};

export const useLazyCvProjects = () => {
  return useLazyQuery<CvProjectsResult, CvArgs>(CV_PROJECTS);
};
