import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { Skill } from 'cv-graphql';

export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category{}}
    }
  }
`;

export interface SkillsQueryData {
  users: Skill[];
}

export const useLazySkills = () => {
  return useLazyQuery<SkillsQueryData>(SKILLS);
};
