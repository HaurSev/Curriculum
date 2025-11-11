import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AddProfileSkillInput, Profile } from 'cv-graphql';

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type AppProfileSkillArgs = {
  skill: AddProfileSkillInput;
};

export type AddProfileSkillResult = {
  updateProfileSkill: Profile;
};

export const useLazyAddProfileSkill = () => {
  return useMutation<AddProfileSkillResult, AppProfileSkillArgs>(
    ADD_PROFILE_SKILL,
  );
};
