import { gql } from '@apollo/client';
import type { AuthInput, AuthResult } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP);
};
