import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuthenticatedUser } from 'lib/authentication/api/hooks/use-authenticated-user';

import { NavigationRoutes } from 'router/enums/navigation-routes';

const ProtectedRoute = (): ReactNode => {
  const { authenticatedUser, loading } = useAuthenticatedUser();

  if (loading) {
    return null;
  }

  if (!authenticatedUser) {
    return <Navigate replace to={NavigationRoutes.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
