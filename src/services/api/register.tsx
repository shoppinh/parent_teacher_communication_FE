import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { DeviceTokenQuery, RegisterQuery } from 'types/Register';

export const register = async (query: RegisterQuery) => {
  const params = {
    mobilePhone: query.phone,
    userName: query.userName,
  };

  return new apiClient('').post(APIs.user.registerInfo, params);
};
export const registerDeviceToken = async (query: DeviceTokenQuery) => {
  return new apiClient(query.token).post(APIs.user.registerDeviceToken, query);
};
//
// export const forgotPassword = async (query: ForgotQuery) => {
//   const params = {
//     mobilePhone: query.phone,
//   };
//   return new apiClient('').post(APIs.user.forgetPassword, params);
// };
//
// export const setPassword = async (query: SetPasswordQuery) => {
//   return new apiClient('').post(APIs.user.registerSetPassword, query);
// };
//
// export const reSendCode = async (query: ResendCodeQuery) => {
//   return new apiClient('').post(APIs.user.registerReSendCode, query);
// };
//
//
// export const forgotVerifyCode = async (query: VerifyQuery) => {
//   return new apiClient('').post(APIs.user.forgetVerifyCode, query);
// };
//
// export const forgotSetPassword = async (query: SetPasswordQuery) => {
//   return new apiClient('').post(APIs.user.forgetSetPassword, query);
// };
//

// export const verifyCode = async (query: VerifyQuery) => {
//   return new apiClient('').post(APIs.user.registerVerifyCode, query);
// };
