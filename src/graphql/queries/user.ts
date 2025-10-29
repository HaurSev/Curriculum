import { gql } from '@apollo/client';
import type { User } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      role
      created_at
      position {
        name
      }
      department {
        name
      }
      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`;

export type UserArgs = {
  userId: string;
};

export type UserResult = {
  user: User;
};

export const useLazyUser = () => {
  return useLazyQuery<UserResult, UserArgs>(USER);
};
