import { APIs } from '../base/type';
import apiClient from '../base/apiClient';
import { TeacherAssignmentDetailTokenQuery } from '../../types/TeacherAssignment';

export const getTeacherAssignmentByClassAndTeacher = async (
  query: TeacherAssignmentDetailTokenQuery
) => {
  const { token, classId } = query;
  const endpoint = APIs.teacher.teacherAssignment.getTeacherAssignmentByClassAndTeacher.replace(
    '{classId}',
    `${classId}`
  );
  return new apiClient(token).get(endpoint);
};
