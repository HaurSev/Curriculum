import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppRoutes } from './router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    if (location.pathname !== AppRoutes.LOGIN) {
      return (
        <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />
      );
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
