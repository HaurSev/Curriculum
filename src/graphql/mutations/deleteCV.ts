import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { DeleteCvInput, DeleteResult } from 'cv-graphql';

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

export type DeleteCvArgs = {
  cv: DeleteCvInput;
};

export type AddCvResult = {
  newCv: DeleteResult;
};

export const useLazyDeleteCv = () => {
  return useMutation<AddCvResult, DeleteCvArgs>(DELETE_CV);
};
