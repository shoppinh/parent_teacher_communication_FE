import apiClient from '../base/apiClient';
import { APIs } from '../base/type';
import {
  AddStudentQuery,
  StudentDetailTokenQuery,
  StudentListByClassTokenQuery,
  UpdateStudentQuery,
} from '../../types/Student';
import { OnlyTokenQuery } from '../../types/Session';
import { ProgressListByStudentTokenQuery } from '../../types/Progress';

export const getStudentListByClass = async (query: StudentListByClassTokenQuery) => {
  const { token, classId, ...rest } = query;
  const endpoint = APIs.student.getAllStudentByClass.replace('{classId}', `${classId}`);
  return new apiClient(token).get(endpoint, rest);
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

export const getUnassignedStudentList = async (query: OnlyTokenQuery) => {
  const { token } = query;
  return new apiClient(token).post(APIs.student.getUnassignedStudentList);
};

export const addStudent = async (query: AddStudentQuery) => {
  const { token, ...rest } = query;
  return new apiClient(token).post(APIs.student.addStudent, rest);
};

export const updateStudent = async (query: UpdateStudentQuery) => {
  const { token, ...rest } = query;
  const endpoint = APIs.student.updateStudent.replace('{studentId}', `${query.studentId}`);
  return new apiClient(token).put(endpoint, rest);
};

export const removeStudentFromParent = async (query: StudentDetailTokenQuery) => {
  const { token, studentId } = query;
  const endpoint = APIs.student.updateStudent.replace('{studentId}', `${studentId}`);
  return new apiClient(token).delete(endpoint);
};
