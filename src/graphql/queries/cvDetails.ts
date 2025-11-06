import { gql } from '@apollo/client';
import type { Cv } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const CV_DETAILS = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
      }
    }
  }
`;

export type CvArgs = {
  cvId: string;
};

export type CvDetailsResult = {
  cv: Cv;
};

export const useLazyCvDetails = () => {
  return useLazyQuery<CvDetailsResult, CvArgs>(CV_DETAILS);
};
