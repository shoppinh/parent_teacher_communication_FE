import { StudentListByClassTokenQuery } from '../../types/Student';
import { APIs } from '../base/type';
import apiClient from '../base/apiClient';
import { TeacherAssignmentDetailTokenQuery } from '../../types/TeacherAssignment';
import { OnlyTokenQuery } from '../../types/Session';
import { ProgressListByStudentTokenQuery } from '../../types/Progress';

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

export const getStudentListByParent = async (query: OnlyTokenQuery) => {
  const { token } = query;

  return new apiClient(token).post(APIs.student.getAllStudent);
};

export const getProgressListByStudent = async (query: ProgressListByStudentTokenQuery) => {
  const { token, studentId } = query;
  const endpoint = APIs.student.progress.getProgressListByStudent.replace(
    '{studentId}',
    `${studentId}`
  );
  return new apiClient(token).post(endpoint);
};
