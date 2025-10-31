import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { DeleteProfileSkillInput, Profile } from 'cv-graphql';

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type DeleteProfileSkillArgs = {
  skill: DeleteProfileSkillInput;
};

export type DeleteProfileSkillResult = {
  deleteProfileSkill: Profile;
};

export const useLazyDeleteProfileSkill = () => {
  return useMutation<DeleteProfileSkillResult, DeleteProfileSkillArgs>(
    DELETE_PROFILE_SKILL,
  );
};
