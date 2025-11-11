import type { Cv } from 'cv-graphql';

export interface DeleteCVProps {
  cv: Cv;
  onClick: () => void;
  onDelete: () => void;
}
