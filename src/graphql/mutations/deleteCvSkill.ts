import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { Cv, DeleteCvSkillInput } from 'cv-graphql';

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type DeleteCvSkillArgs = {
  skill: DeleteCvSkillInput;
};

export type DeleteCvSkillResult = {
  cv: Cv;
};

export const useLazyDeleteCvSkill = () => {
  return useMutation<DeleteCvSkillResult, DeleteCvSkillArgs>(DELETE_CV_SKILL);
};
