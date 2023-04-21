import { TeacherDetailQuery } from 'types/Admin/Teacher';
import apiClient from '../base/apiClient';
import { APIs } from 'services/base/type';
import { ParentListQuery } from 'types/Parent';

export const fetchTeacherDetail = async (query: TeacherDetailQuery) => {
  const { token, teacherId } = query;
  const url = APIs.admin.teacher.getTeacherDetail.replace('{teacherId}', `${teacherId}`);
  // const qs = qsBuilder(restQuery);
  return new apiClient(token || '').get(url);
};

export const getParentList = async (query: ParentListQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.parent.getAllParent, payload);
};
