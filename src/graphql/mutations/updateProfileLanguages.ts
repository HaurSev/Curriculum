import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AddProfileLanguageInput, Profile } from 'cv-graphql';

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export type UpdateProfileLanguageArgs = {
  language: AddProfileLanguageInput;
};

export type UpadateProfileLanguageResult = {
  updateProfileSkill: Profile;
};

export const useLazyUpdateProfileLanguage = () => {
  return useMutation<UpadateProfileLanguageResult, UpdateProfileLanguageArgs>(
    UPDATE_PROFILE_LANGUAGE,
  );
};
