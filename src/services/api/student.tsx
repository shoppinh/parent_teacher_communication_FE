import apiClient from '../base/apiClient';
import { APIs } from '../base/type';
import { StudentListByClassTokenQuery } from '../../types/Student';

export const getStudentListByClass = async (query: StudentListByClassTokenQuery) => {
  const { token, classId, ...rest } = query;
  const endpoint = APIs.student.getAllStudentByClass.replace('{classId}', `${query.classId}`);
  return new apiClient(token).get(endpoint, rest);
};
