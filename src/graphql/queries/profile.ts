import { gql } from '@apollo/client';
import type { Profile } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const PROFILE = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export type ProfileArgs = {
  userId: string;
};

export type ProfileResult = {
  profile: Profile;
};

export const useLazyProfile = () => {
  return useLazyQuery<ProfileResult, ProfileArgs>(PROFILE);
};
