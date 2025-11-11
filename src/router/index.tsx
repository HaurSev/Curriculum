import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import ProtectedRoute from './ProtectedRoute';
import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const ProfileLanguage = lazy(
  () => import('../pages/ProfileLanguage/ProfileLanguage'),
);
const CVsPage = lazy(() => import('../pages/CVsPage/CVsPage'));
const Login = lazy(() => import('../pages/Login/Login'));
const Signup = lazy(() => import('../pages/Signup/Signup'));
const ForgotPassword = lazy(
  () => import('../pages/ForgotPassword/ForgotPassword'),
);
const Users = lazy(() => import('../pages/Users/Users'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const ProfileSkills = lazy(
  () => import('../pages/ProfileSkills/ProfileSkills'),
);
const UserCv = lazy(() => import('../pages/UserCV/UserCV'));

const Languages = lazy(() => import('../pages/Languages/Languages'));

const Skills = lazy(() => import('../pages/Skills/Skills'));

const CvDetailsPage = lazy(
  () => import('../pages/CvDetailsPage/CvDetailsPage'),
);

const CvSkillsPage = lazy(() => import('../pages/CvSkillsPage/CvSkillsPage'));

const CvProjectsPage = lazy(
  () => import('../pages/CvProjectsPage/CvProjectsPage'),
);

const CvPreview = lazy(() => import('../pages/CvPreviewPage/CvPreviewPage'));

const router = createBrowserRouter([
  {
    path: AppRoutes.Login,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Registration,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute requireAuth={false}>
          <Signup />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.ForgotPassword,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute requireAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.Profile.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.Skills.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <ProfileSkills />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.UserLanguages.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <ProfileLanguage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.UserCv.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <UserCv />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <CVsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Details.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <CvDetailsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Skills.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <CvSkillsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Skills.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <CvSkillsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Projects.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <CvProjectsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Preview.Path,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <CvPreview />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Languages,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Languages />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Skills,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProtectedRoute>
          <Skills />
        </ProtectedRoute>
      </Suspense>
    ),
  },
]);

export default router;
