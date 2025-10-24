import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const location = useLocation();
  const token = sessionStorage.getItem('access_token');

  if (requireAuth && !token) {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
