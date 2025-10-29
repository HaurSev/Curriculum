import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { Department } from 'cv-graphql';

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
      created_at
    }
  }
`;

export interface DepartmentQueryData {
  departments: Department[];
}

export const useLazyDepartments = () => {
  return useLazyQuery<DepartmentQueryData>(DEPARTMENTS);
};
