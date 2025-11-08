import { gql } from '@apollo/client';
import type { Cv } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const CV = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      skills {
        name
        categoryId
      }
      languages {
        name
        proficiency
      }
      user {
        id
        position {
          name
        }
        profile {
          full_name
        }
      }
      projects {
        domain
      }
    }
  }
`;

export type CvArgs = {
  cvId: string;
};

export type CvResult = {
  cv: Cv;
};

export const useLazyCv = () => {
  return useLazyQuery<CvResult, CvArgs>(CV);
};
