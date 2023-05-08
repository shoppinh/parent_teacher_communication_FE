import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { ParentPayload } from 'types/Parent';
import { DeviceTokenQuery } from 'types/Register';

export const register = async (query: ParentPayload) => {
  return new apiClient('').post(APIs.user.registerInfo, query);
};
export const registerDeviceToken = async (query: DeviceTokenQuery) => {
  return new apiClient(query.token).post(APIs.user.registerDeviceToken, query);
};
