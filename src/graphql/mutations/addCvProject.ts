import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AddCvProjectInput, Cv } from 'cv-graphql';

export const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
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

export type AddCvprojectArgs = {
  project: AddCvProjectInput;
};

export type AddCvProjectResult = {
  addCvProject: Cv;
};

export const useLazyAddCvProject = () => {
  return useMutation<AddCvProjectResult, AddCvprojectArgs>(ADD_CV_PROJECT);
};
