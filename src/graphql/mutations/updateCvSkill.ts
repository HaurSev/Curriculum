import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { Cv, UpdateCvSkillInput } from 'cv-graphql';

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type UpdateCvSkillArgs = {
  skill: UpdateCvSkillInput;
};

export type UpadateCvSkillResult = {
  cv: Cv;
};

export const useLazyUpdateCvSkill = () => {
  return useMutation<UpadateCvSkillResult, UpdateCvSkillArgs>(UPDATE_CV_SKILL);
};
