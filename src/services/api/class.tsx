import { UpdateLeaveFormStatusQuery } from 'types/Student';
import { ClassDetailTokenQuery, ClassListTokenQuery } from '../../types/Class';
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
