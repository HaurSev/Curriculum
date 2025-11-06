export const AppRoutes = {
  Login: '/auth/login',
  Registration: '/auth/signup',
  ForgotPassword: '/auth/forgot_password',
  Users: {
    Path: '/users',
    Children: {
      Profile: {
        Path: '/users/:userId/profile',
        Create: (userId: string) => `/users/${userId}/profile`,
      },
      Skills: {
        Path: '/users/:userId/skills',
        Create: (userId: string) => `/users/${userId}/skills`,
      },
      UserLanguages: {
        Path: '/users/:userId/languages',
        Create: (userId: string) => `/users/${userId}/languages`,
      },
      UserCv: {
        Path: '/users/:userId/cvs',
        Create: (userId: string) => `/users/${userId}/cvs`,
      },
    },
  },
  Cvs: {
    Path: '/cvs',
    Children: {
      Details: {
        Path: '/cvs/:cvId/details',
        Create: (cvId: string) => `/cvs/${cvId}/details`,
      },
      Skills: {
        Path: '/cvs/:cvId/skills',
        Create: (cvId: string) => `/cvs/${cvId}/skills`,
      },
      Projects: {
        Path: '/cvs/:cvId/projects',
        Create: (cvId: string) => `/cvs/${cvId}/projects`,
      },
    },
  },
  Languages: '/languages',
  Skills: '/skills',
} as const;
