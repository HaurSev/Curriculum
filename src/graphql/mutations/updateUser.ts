import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { UpdateUserInput, User } from 'cv-graphql';

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      role
      department_name
      position_name
    }
  }
`;

export type UpdateUserArgs = {
  user: UpdateUserInput;
};

export type UpdateUserResult = {
  updateUser: User;
};

export const useLazyUpdateUser = () => {
  return useMutation<UpdateUserResult, UpdateUserArgs>(UPDATE_USER);
};
