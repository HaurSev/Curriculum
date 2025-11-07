import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { Cv, RemoveCvProjectInput } from 'cv-graphql';

export const REMOVE_CV_PROJECT = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
      name
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
  }
`;

export type DeleteCvProjectArgs = {
  project: RemoveCvProjectInput;
};

export type DeleteCvProjectResult = {
  deleteCvProject: Cv;
};

export const useLazyRemoveCvProject = () => {
  return useMutation<DeleteCvProjectResult, DeleteCvProjectArgs>(
    REMOVE_CV_PROJECT,
  );
};
