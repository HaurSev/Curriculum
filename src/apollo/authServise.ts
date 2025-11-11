import { makeVar } from '@apollo/client';
import { clearTokens, saveTokens, saveUserId } from './authStorage.ts';
import type { User } from 'cv-graphql';

export const isAuthenticatedVar = makeVar<boolean>(
  !!localStorage.getItem('access_token'),
);

export const currentUserVar = makeVar<User | null>(null);

export function authSuccess(data: {
  access_token?: string;
  refresh_token?: string;
  user?: User;
}) {
  const { access_token, refresh_token, user } = data;

  if (access_token && refresh_token) {
    saveTokens(access_token, refresh_token);
    isAuthenticatedVar(true);
  }

  if (user) {
    currentUserVar(user);
    saveUserId(user.id);
  }
}

export function clearTokensAndLogout() {
  clearTokens();
  isAuthenticatedVar(false);
  currentUserVar(null);
}
