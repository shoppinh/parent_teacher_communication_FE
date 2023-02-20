import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from 'types';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../store/selectors/session';

export const ProtectedRoute = ({ children, unAuthenticatedRedirectTo }: ProtectedRouteProps) => {
  const currentAccessToken = useSelector(getAccessToken);

  const isLoggedIn = currentAccessToken && currentAccessToken !== '';

  return isLoggedIn ? children : <Navigate to={unAuthenticatedRedirectTo} />;
};
