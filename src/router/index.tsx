import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import ProtectedRoute from './ProtectedRoute';
import { lazy, Suspense } from 'react';

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

const router = createBrowserRouter([
  {
    path: AppRoutes.Login,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Registration,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <Signup />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.ForgotPassword,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <Users />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.Profile.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.Skills.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileSkills />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.UserLanguages.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileLanguage />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Users.Children.UserCv.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserCv />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CVsPage />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Details.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CvDetailsPage />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Skills.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CvSkillsPage></CvSkillsPage>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Skills.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CvSkillsPage></CvSkillsPage>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Cvs.Children.Projects.Path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CvProjectsPage></CvProjectsPage>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Languages,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Languages />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Skills,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Skills />
      </Suspense>
    ),
  },
]);

export default router;
