export const AppRoutes = {
  LOGIN: '/auth/login',
  REGISTRATION: '/auth/signup',
  FORGOT_PASWORD: '/auth/forgot_password',
  USERS: {
    path: '/users',
    Children: {
      PROFILE: {
        path: '/users/:userId/profile',
        create: (userId: string) => `/users/${userId}/profile`,
      },
      SKILLS: {
        path: '/users/:userId/skills',
        create: (userId: string) => `/users/${userId}/skills`,
      },
      USER_LANGUAGES: {
        path: '/users/:userId/languages',
        create: (userId: string) => `/users/${userId}/languages`,
      },
      USER_CV: {
        path: '/users/:userId/cvs',
        create: (userId: string) => `/users/${userId}/cvs`,
      },
    },
  },
  CVS: '/cvs',
  LANGUAGES: '/languages',
  SKILLS: '/skills',
} as const;
