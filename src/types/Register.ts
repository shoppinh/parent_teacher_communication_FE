import { actionTypes } from 'utils/constants';
import { User } from './User';

export interface RegisterPayload {
  user: User | null;
  forgotUserId?: number;
  forgotMobilePhone?: string;
  codeExpiredTime?: number;
  isVerified?: boolean;
  isSentReSend?: boolean;
  isRegisterSuccess?: boolean;
  isAccountExists?: boolean;
  isCheckedAccount?: boolean;
}

export interface AccountExistsQuery {
  isAccountExists: boolean;
}

export interface RegisterQuery {
  phone: string;
  userName: string;
}

export interface VerifyQuery {
  userId: number;
  code: string;
}

export interface DeviceTokenQuery {
  consumerId: number;
  fcmToken: string;
  oldFcmToken: string;
  token: string;
}

export interface ResendCodeQuery {
  consumerId: number;
  actionType: actionTypes;
}

export interface SetPasswordQuery {
  consumerId: number;
  password: string;
  repassword: string;
}

export interface ForgotQuery {
  phone: string;
}

export interface ForgotPayload {
  forgotUserId: number;
  forgotMobilePhone: string;
  codeExpiredTime?: number;
}

export interface RegisterState {
  data: RegisterPayload;
  error?: RegisterError | null;
  loading?: boolean;
}

export interface RegisterError {
  code: RegisterErrorType | null;
  message?: string;
}

export enum RegisterErrorType {
  RESPONSE_ERROR = 1,
  REGISTER_FAILED = 400,
  CONFLICT_PHONE = 409,
}
