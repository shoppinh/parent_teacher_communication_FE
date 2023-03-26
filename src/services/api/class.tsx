import { APIs } from '../base/type';
import apiClient from '../base/apiClient';
import { ClassDetailTokenQuery, ClassListTokenQuery } from '../../types/Class';

export const getClassListByRole = async (query: ClassListTokenQuery) => {
  return new apiClient(query.token).get(APIs.class.getClassListByRole);
};

export const getClassDetail = async (query: ClassDetailTokenQuery) => {
  const endpoint = APIs.class.getClassDetail.replace('{classId}', query.classId);
  return new apiClient(query.token).get(endpoint);
};
