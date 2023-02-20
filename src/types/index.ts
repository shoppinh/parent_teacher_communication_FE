import { RootState } from './RootState';
import { ConstantRoles } from '../utils/constants';

export interface LayoutProps {}

export type ProtectedRouteProps = {
  children: JSX.Element;
  unAuthenticatedRedirectTo: string;
};
export type RoleBasedProtectedRouteProps = Omit<ProtectedRouteProps, 'redirectTo'> & {
  role: ConstantRoles;
  unAuthorizedRedirectTo: string;
};

export type { RootState };
