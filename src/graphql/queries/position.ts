import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { Position } from 'cv-graphql';

export const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
      created_at
    }
  }
`;

export interface PositionsQueryData {
  positions: Position[];
}

export const useLazyPositions = () => {
  return useLazyQuery<PositionsQueryData>(POSITIONS);
};
