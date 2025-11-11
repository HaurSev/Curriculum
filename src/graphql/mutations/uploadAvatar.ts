import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { UploadAvatarInput } from 'cv-graphql';

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export type AvatarArgs = {
  avatar: UploadAvatarInput;
};

export const useLazyUploadAvatar = () => {
  return useMutation<string, AvatarArgs>(UPLOAD_AVATAR);
};
