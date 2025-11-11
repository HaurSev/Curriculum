import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { DeleteResult, DeleteSkillInput } from 'cv-graphql';

export const DELETE_SKILL = gql`
  mutation DeleteSkill($skill: DeleteSkillInput!) {
    deleteSkill(skill: $skill) {
      affected
    }
  }
`;

export type DeleteSkillArgs = {
  skill: DeleteSkillInput;
};

export type DeleteSkillResult = {
  number: DeleteResult;
};

export const useLazyDeleteSkill = () => {
  return useMutation<DeleteSkillResult, DeleteSkillArgs>(DELETE_SKILL);
};
