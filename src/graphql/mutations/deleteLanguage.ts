import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { DeleteLanguageInput, DeleteResult } from 'cv-graphql';

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($language: DeleteLanguageInput!) {
    deleteLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`;

export type DeleteLanguageArgs = {
  language: DeleteLanguageInput;
};

export type DeleteLanguageResult = {
  number: DeleteResult;
};

export const useLazyDeleteLanguage = () => {
  return useMutation<DeleteLanguageResult, DeleteLanguageArgs>(DELETE_LANGUAGE);
};
