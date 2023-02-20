import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { RoleBasedProtectedRouteProps } from 'types';
import { useCheckSpecificRole } from '../../utils/hook/useCheckSpecificRole';

export const RoleBaseProtectedRoute = ({
  children,
  unAuthorizedRedirectTo,
  unAuthenticatedRedirectTo,
  role,
}: RoleBasedProtectedRouteProps) => {
  const { isLoggedIn, isValidRole } = useCheckSpecificRole(role);
  return isValidRole ? (
    children
  ) : (
    <Navigate to={isLoggedIn ? unAuthorizedRedirectTo : unAuthenticatedRedirectTo} />
  );
};
