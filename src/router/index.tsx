import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: AppRoutes.LOGIN,
    element: (
      <ProtectedRoute requireAuth={false}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.REGISTRATION,
    element: (
      <ProtectedRoute requireAuth={false}>
        <Signup />
      </ProtectedRoute>
    ),
  },
]);

export default router;
