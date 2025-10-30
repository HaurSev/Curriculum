import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { UserRole } from 'cv-graphql';

export const USERS = gql`
  query Users {
    users {
      id
      email
      department_name
      position_name
      role
      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`;

export interface UserProfile {
  first_name: string;
  last_name: string;
  full_name: string;
  avatar?: string | null;
}

export interface UserData {
  id: string;
  email: string;
  department_name: string;
  position_name: string;
  profile: UserProfile;
  role: UserRole;
}

export interface UsersQueryData {
  users: UserData[];
}

export const useLazyUsers = () => {
  return useLazyQuery<UsersQueryData>(USERS);
};
