import apiClient from '../base/apiClient';
import { APIs } from 'services/base/type';
import { AuthQuery, LogoutQuery, RefreshTokenQuery, SocialRegisterPayload } from 'types/Session';

export const login = async (query: AuthQuery) => {

  const params = {
    mobilePhone: query.phone,
    password: query.password
  };

  return new apiClient('').post(APIs.consumer.login, params);
}


export const logout = async (query: LogoutQuery) => {

  const params = {
    token: query.token,
    fcmToken: query.fcmToken,
    consumerId: query.consumerId
  };

  return new apiClient(query.token).post(APIs.consumer.logout, params);
}

export const refreshToken = async (query: RefreshTokenQuery) => {
  const params = {
    token: query.token,
    refreshToken: query.refreshToken,
  };

  // Admin role Id = 1
  if(query.roleId && query.roleId === 1) {
    return new apiClient('').post(APIs.admin.refreshToken, params);
  }
  return new apiClient('').post(APIs.consumer.refreshToken, params);
}

export const getUserInfo = async (query: AuthQuery) => {
  return new apiClient('').get(APIs.consumer.info + query.phone);
}

export const doSocialRegister = async (query: SocialRegisterPayload) => {
  const params = {
    data: query.data
  };

  return new apiClient('').post(APIs.social.register, params);
}