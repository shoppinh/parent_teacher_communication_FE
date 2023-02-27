import apiClient from '../base/apiClient';
import { APIs } from 'services/base/type';
import { TeacherDetailQuery } from '../../types/Teacher';

export const fetchTeacherDetail = async (query: TeacherDetailQuery) => {
  const { token, teacherId } = query;
  const url = APIs.admin.teacher.getTeacherDetail.replace('{teacherId}', `${teacherId}`);
  // const qs = qsBuilder(restQuery);
  return new apiClient(token || '').get(url);
};
