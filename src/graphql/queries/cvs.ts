import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { Cv } from 'cv-graphql';

export const CVS = gql`
  query CVs {
    cvs {
      id
      name
      education
      description
      user {
        email
        id
      }
    }
  }
`;

export interface CVsQueryData {
  cvs: Cv[];
}

export const useLazyCvs = () => {
  return useLazyQuery<CVsQueryData>(CVS);
};
