import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

const router = createBrowserRouter([
  {
    path: AppRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: AppRoutes.REGISTRATION,
    element: <Signup />,
  },
]);

export default router;
