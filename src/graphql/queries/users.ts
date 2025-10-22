import { gql } from '@apollo/client';
// import type { User } from 'cv-graphql';
import { useLazyQuery } from '@apollo/client/react';

export const USERS = gql`
  query Users {
    users {
      id
      email
      department_name
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

export interface UserProfile {
  first_name: string;
  last_name: string;
  avatar?: string | null;
}

export interface UserData {
  id: string;
  email: string;
  department_name: string;
  position_name: string;
  profile: UserProfile;
}

export interface UsersQueryData {
  users: UserData[];
}

export const useLazyUsers = () => {
  return useLazyQuery<UsersQueryData>(USERS);
};
