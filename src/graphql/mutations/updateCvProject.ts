import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { Cv, UpdateCvProjectInput } from 'cv-graphql';

export const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
      projects {
        id
        start_date
        end_date
        project {
          id
          name
          start_date
          end_date
        }
      }
    }
  }
`;

export type UpdateCvProjectArgs = {
  project: UpdateCvProjectInput;
};

export type UpadateCvProjectResult = {
  cv: Cv;
};

export const useLazyUpdateCvProject = () => {
  return useMutation<UpadateCvProjectResult, UpdateCvProjectArgs>(
    UPDATE_CV_PROJECT,
  );
};
