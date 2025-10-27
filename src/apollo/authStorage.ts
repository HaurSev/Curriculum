import { makeVar } from '@apollo/client';
import type { User } from 'cv-graphql';
import { AppRoutes } from '../router/router';

export const isAuthenticatedVar = makeVar<boolean>(
  !!sessionStorage.getItem('access_token'),
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
  window.location.href = AppRoutes.LOGIN;
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem('access_token');
}

export function getRefreshToken(): string | null {
  return sessionStorage.getItem('refresh_token');
}

export function saveTokens(access: string, refresh: string) {
  sessionStorage.setItem('access_token', access);
  sessionStorage.setItem('refresh_token', refresh);
}

export function clearTokens() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('user_id');
}

export function saveUserId(id: string) {
  sessionStorage.setItem('user_id', id);
}

export function getUserId(): string | null {
  return sessionStorage.getItem('user_id');
}
