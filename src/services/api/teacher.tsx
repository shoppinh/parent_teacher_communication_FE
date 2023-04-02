import { AssignStudentQuery, RemoveStudentQuery } from '../../types/TeacherAssignment';
import apiClient from '../base/apiClient';
import { APIs } from '../base/type';

export const assignStudent = async (query: AssignStudentQuery) => {
  const { token, classId, studentId } = query;
  return new apiClient(token).post(APIs.teacher.assignStudent, { studentId, classId });
};

export const removeStudentFromClass = async (query: RemoveStudentQuery) => {
  const { token, studentId } = query;
  return new apiClient(token).post(APIs.teacher.removeStudent, { studentId });
};
