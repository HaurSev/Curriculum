import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { Cv, UpdateCvInput } from 'cv-graphql';

export const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;

export type AppCvArgs = {
  cv: UpdateCvInput;
};

export type AddCvResult = {
  updateCv: Cv;
};

export const useLazyUpdateCv = () => {
  return useMutation<AddCvResult, AppCvArgs>(UPDATE_CV);
};
