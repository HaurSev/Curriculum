import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AddCvSkillInput, Cv } from 'cv-graphql';

export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      name
      user {
        id
      }
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type createSkillArgs = {
  skill: AddCvSkillInput;
};

export type CreateSkillResult = {
  addCvSkill: Cv;
};

export const useLazyAddCvSkill = () => {
  return useMutation<CreateSkillResult, createSkillArgs>(ADD_CV_SKILL);
};
