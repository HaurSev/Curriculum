import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { Skill, UpdateSkillInput } from 'cv-graphql';

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      name
      category {
        name
      }
    }
  }
`;

export type updateSkillArgs = {
  skill: UpdateSkillInput;
};

export type updateSkillResult = {
  newSkill: Skill;
};

export const useLazyUpdateSkill = () => {
  return useMutation<updateSkillResult, updateSkillArgs>(UPDATE_SKILL);
};
