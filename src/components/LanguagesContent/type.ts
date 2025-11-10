import type { LanguageProficiency } from 'cv-graphql';

export interface LanguageContentProps {
  languages: LanguageProficiency[];
}

export interface LanguageBodyProps {
  language: LanguageProficiency;
}
