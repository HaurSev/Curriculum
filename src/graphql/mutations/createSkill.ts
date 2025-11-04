import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { CreateSkillInput, Skill } from 'cv-graphql';

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      name
      category {
        name
      }
    }
  }
`;

export type createSkillArgs = {
  skill: CreateSkillInput;
};

export type CreateSkillResult = {
  newSkill: Skill;
};

export const useLazyCreateSkill = () => {
  return useMutation<CreateSkillResult, createSkillArgs>(CREATE_SKILL);
};
