import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import {
  DeviceTokenQuery,
  ForgotQuery,
  RegisterQuery,
  ResendCodeQuery,
  SetPasswordQuery,
  VerifyQuery,
} from 'types/Register';

export const register = async (query: RegisterQuery) => {
  const params = {
    mobilePhone: query.phone,
    userName: query.userName,
  };

  return new apiClient('').post(APIs.consumer.registerInfo, params);
};

export const verifyCode = async (query: VerifyQuery) => {
  return new apiClient('').post(APIs.consumer.registerVerifyCode, query);
};

export const setPassword = async (query: SetPasswordQuery) => {
  return new apiClient('').post(APIs.consumer.registerSetPassword, query);
};

export const reSendCode = async (query: ResendCodeQuery) => {
  return new apiClient('').post(APIs.consumer.registerReSendCode, query);
};

export const forgotPassword = async (query: ForgotQuery) => {
  const params = {
    mobilePhone: query.phone,
  };

  return new apiClient('').post(APIs.consumer.forgetPassword, params);
};

export const forgotVerifyCode = async (query: VerifyQuery) => {
  return new apiClient('').post(APIs.consumer.forgetVerifyCode, query);
};

export const forgotSetPassword = async (query: SetPasswordQuery) => {
  return new apiClient('').post(APIs.consumer.forgetSetPassword, query);
};

export const registerDeviceToken = async (query: DeviceTokenQuery) => {
  return new apiClient(query.token).post(APIs.consumer.registerDeviceToken, query);
};
