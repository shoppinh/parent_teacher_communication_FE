import { User, UserPayload } from './User';
import { Student } from './Student';

export interface AuthQuery {
  username: string;
  password?: string;
  rememberMe?: boolean;
}

export interface AuthTokenQuery {
  phone: string;
  token: string;
}

export interface OnlyTokenQuery {
  token: string;
}

export interface RefreshTokenQuery {
  refreshToken: string;
  token: string;
  roleId?: number;
}

export interface AuthUserPayload {
  user: User;
}

export interface LogoutQuery {
  token?: string;
  fcmToken?: string;
  userId?: string;
}

export interface SessionState {
  data: SessionPayload;
  error?: SessionError | null;
  loading?: boolean;
}

export interface AuthPayLoad {
  rememberMe?: boolean;
  phoneNumber?: string;
  accessToken?: string;
  refreshToken?: string;
  lastLogin?: string;
  isLogout?: boolean;
  user?: {
    data?: User;
    notifications?: {
      // menuGUID
      [key: string]: {
        messageCountUnread?: number;
      };
    };
  };
  fcmToken?: string;
}

export interface SessionPayload {
  auth?: AuthPayLoad;
  profile?: Profile;
}

export enum SessionErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface SessionError {
  code: SessionErrorType | null;
  message?: string;
}
export interface Profile extends User {
  address?: string;
  degree?: string;
  job?: string;
  gender?: string;
  age?: number;
  children?: Student[];
}

export type UpdateUserQuery = Omit<UserPayload, 'fullname' | 'firstname' | 'lastname'> & {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  token: string;
};
