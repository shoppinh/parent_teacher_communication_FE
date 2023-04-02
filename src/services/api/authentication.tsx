import apiClient from '../base/apiClient';
import { APIs } from 'services/base/type';
import {AuthQuery, LogoutQuery, OnlyTokenQuery, RefreshTokenQuery} from 'types/Session';

export const login = async (query: AuthQuery) => {
  const params = {
    username: query.username,
    password: query.password,
  };

  return new apiClient('').post(APIs.user.login, params);
};

export const logout = async (query: LogoutQuery) => {
  const params = {
    token: query.token,
    fcmToken: query.fcmToken,
    userId: query.userId,
  };

  return new apiClient(query.token).post(APIs.user.logout, params);
};

export const refreshToken = async (query: RefreshTokenQuery) => {
  const params = {
    token: query.token,
    refreshToken: query.refreshToken,
  };

  // Admin role Id = 1

  return new apiClient('').post(APIs.user.refreshToken, params);
};

export const getUserProfile = async (query: OnlyTokenQuery) => {
  return new apiClient(query.token).get(APIs.user.info);
};
