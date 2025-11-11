import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { SkillCategory } from 'cv-graphql';

export const SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
      children {
        id
        name
      }
    }
  }
`;

export interface SkillsCategoryQueryData {
  skillCategories: SkillCategory[];
}

export const useLazySkillCategories = () => {
  return useLazyQuery<SkillsCategoryQueryData>(SKILL_CATEGORIES);
};
