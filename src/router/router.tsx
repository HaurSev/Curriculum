export const AppRoutes = {
  LOGIN: '/auth/login',
  REGISTRATION: '/auth/signup',
  FORGOT_PASWORD: '/auth/forgot_password',
  USERS: '/users',
  PROFILE: {
    path: '/users/:userId/profile',
    create: (userId: string) => `/users/${userId}/profile`,
  },
  SKILLS: {
    path: '/users/:userId/skills',
    create: (userId: string) => `/users/${userId}/skills`,
  },
} as const;
