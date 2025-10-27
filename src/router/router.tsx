export const AppRoutes = {
  LOGIN: '/auth/login',
  REGISTRATION: '/auth/signup',
  FORGOT_PASWORD: '/auth/forgot_password',
  USERS: '/users',
  PROFILE: {
    path: '/users/:userId/profile',
    create: (userId: string) => `/users/${userId}/profile`,
  },
} as const;
