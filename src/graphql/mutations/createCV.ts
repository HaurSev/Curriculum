import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { CreateCvInput, Cv } from 'cv-graphql';

export const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;

export type AppCvArgs = {
  cv: CreateCvInput;
};

export type AddCvResult = {
  newCv: Cv;
};

export const useLazyCreateCv = () => {
  return useMutation<AddCvResult, AppCvArgs>(CREATE_CV);
};
