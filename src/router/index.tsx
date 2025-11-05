import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import ProtectedRoute from './ProtectedRoute';
import { lazy, Suspense } from 'react';
import ProfileLanguage from '../pages/ProfileLanguage/ProfileLanguage';
import CVsPage from '../pages/CVsPage/CVsPage';

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

const router = createBrowserRouter([
  {
    path: AppRoutes.LOGIN,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.REGISTRATION,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <Signup />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.FORGOT_PASWORD,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.USERS.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute requireAuth={false}>
          <Users />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: AppRoutes.USERS.Children.PROFILE.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.USERS.Children.SKILLS.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileSkills />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.USERS.Children.USER_LANGUAGES.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileLanguage />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.USERS.Children.USER_CV.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserCv />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.CVS,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CVsPage />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.LANGUAGES,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Languages />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.SKILLS,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Skills />
      </Suspense>
    ),
  },
]);

export default router;
