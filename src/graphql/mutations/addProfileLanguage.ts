import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AddProfileLanguageInput, Profile } from 'cv-graphql';

export const ADD_PROFILE_LANGUAGES = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export type AppProfileLanguagesArgs = {
  language: AddProfileLanguageInput;
};

export type AddProfileLanguagesResult = {
  updateProfileLanguage: Profile;
};

export const useLazyAddProfileLanguage = () => {
  return useMutation<AddProfileLanguagesResult, AppProfileLanguagesArgs>(
    ADD_PROFILE_LANGUAGES,
  );
};
