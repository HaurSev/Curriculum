import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { Language } from 'cv-graphql';

export const LANGUAGES = gql`
  query Languages {
    languages {
      id
      name
      native_name
    }
  }
`;

export interface LanguagesQueryData {
  languages: Language[];
}

export const useLazyLanguages = () => {
  return useLazyQuery<LanguagesQueryData>(LANGUAGES);
};
