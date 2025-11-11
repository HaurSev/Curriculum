import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { DeleteProfileLanguageInput, Profile } from 'cv-graphql';

export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export type DeleteProfileLanguageArgs = {
  language: DeleteProfileLanguageInput;
};

export type DeleteProfileLanguageResult = {
  deleteProfileLanguage: Profile;
};

export const useLazyDeleteProfileLanguage = () => {
  return useMutation<DeleteProfileLanguageResult, DeleteProfileLanguageArgs>(
    DELETE_PROFILE_LANGUAGE,
  );
};
