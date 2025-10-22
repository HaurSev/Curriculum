import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export const FORGOT_PASWORD = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;

export const useForgotPassword = () => {
  return useMutation(FORGOT_PASWORD);
};
