import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { UpdateLanguageInput, Language } from 'cv-graphql';

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
      id
      name
+      native_name\
      iso2
    }
  }
`;

export type updateLanguageArgs = {
  language: UpdateLanguageInput;
};

export type updateLanguageResult = {
  newLanguage: Language;
};

export const useLazyUpdateLanguage = () => {
  return useMutation<updateLanguageResult, updateLanguageArgs>(UPDATE_LANGUAGE);
};
