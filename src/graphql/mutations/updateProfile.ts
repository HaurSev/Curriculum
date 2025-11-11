import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { UpdateProfileInput, Profile } from 'cv-graphql';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;

export type UpdateProfileArgs = {
  profile: UpdateProfileInput;
};

export type UpdateProfileResult = {
  updateProfile: Profile;
};

export const useLazyUpdateProfile = () => {
  return useMutation<UpdateProfileResult, UpdateProfileArgs>(UPDATE_PROFILE);
};
