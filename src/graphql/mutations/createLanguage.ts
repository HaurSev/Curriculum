import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { CreateLanguageInput, Language } from 'cv-graphql';

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`;

export type createLanguageArgs = {
  language: CreateLanguageInput;
};

export type CreateLanguageResult = {
  newLanguage: Language;
};

export const useLazyCreateLanguage = () => {
  return useMutation<CreateLanguageResult, createLanguageArgs>(CREATE_LANGUAGE);
};
