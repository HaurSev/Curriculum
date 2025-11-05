import { gql } from '@apollo/client';
import type { Cv } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const CV_SKILLS = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        categoryId
        name
        mastery
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

export type CvDetailsResult = {
  cv: Cv;
};

export const useLazyCvSkills = () => {
  return useLazyQuery<CvDetailsResult, CvArgs>(CV_SKILLS);
};
