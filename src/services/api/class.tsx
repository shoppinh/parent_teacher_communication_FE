import { UpdateLeaveFormStatusQuery } from 'types/Student';
import {
  ClassDetailTokenQuery,
  ClassListTokenQuery,
  CreateClassQuery,
  UpdateClassQuery,
} from '../../types/Class';
import apiClient from '../base/apiClient';
import { APIs } from '../base/type';

export const getClassListByRole = async (query: ClassListTokenQuery) => {
  return new apiClient(query.token).get(APIs.class.getClassListByRole);
};

export const getClassDetail = async (query: ClassDetailTokenQuery) => {
  const endpoint = APIs.class.getClassDetail.replace('{classId}', query.classId);
  return new apiClient(query.token).get(endpoint);
};

export const updateLeaveFormStatus = async (query: UpdateLeaveFormStatusQuery) => {
  const { token, formId, ...updatePayload } = query;
  const endpoint = APIs.teacher.updateLeaveFormStatus.replace('{leaveFormId}', formId);
  return new apiClient(token).put(endpoint, updatePayload);
};

export const addClass = async (query: CreateClassQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token).post(APIs.admin.class.addClass, payload);
};
export const updateClass = async (query: UpdateClassQuery) => {
  const { token, classId, ...payload } = query;
  const endpoint = APIs.admin.class.updateClass.replace('{classId}', classId);
  return new apiClient(token).put(endpoint, payload);
};

export const removeClass = async (query: ClassDetailTokenQuery) => {
  const { token, classId } = query;
  const endpoint = APIs.admin.class.deleteClass.replace('{classId}', classId);
  return new apiClient(token).delete(endpoint);
};
