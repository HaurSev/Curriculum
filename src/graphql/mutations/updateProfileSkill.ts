import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AddProfileSkillInput, Profile } from 'cv-graphql';

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type UpdateProfileSkillArgs = {
  skill: AddProfileSkillInput;
};

export type UpadateProfileSkillResult = {
  updateProfileSkill: Profile;
};

export const useLazyUpdateProfileSkill = () => {
  return useMutation<UpadateProfileSkillResult, UpdateProfileSkillArgs>(
    UPDATE_PROFILE_SKILL,
  );
};
