import { APIs } from 'services/base/type';
import { CreateTeacherQuery, TeacherDetailQuery, UpdateTeacherQuery } from 'types/Admin/Teacher';
import { ListWithPaginationQuery } from 'types/Common';
import { CreateParentQuery, ParentDetailQuery, UpdateParentQuery } from 'types/Parent';
import apiClient from '../base/apiClient';
import { StudentDetailTokenQuery } from 'types/Student';
import { CreateSubjectQuery, SubjectDetailQuery, UpdateSubjectQuery } from 'types/Subject';
import {
  CreateTeacherAssignmentQuery,
  TeacherAssignmentDetailQuery,
  UpdateTeacherAssignmentQuery,
} from 'types/TeacherAssignment';

export const fetchTeacherDetail = async (query: TeacherDetailQuery) => {
  const { token, teacherId } = query;
  const url = APIs.admin.teacher.getTeacherDetail.replace('{teacherId}', `${teacherId}`);
  // const qs = qsBuilder(restQuery);
  return new apiClient(token || '').get(url);
};

export const getParentList = async (query: ListWithPaginationQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.parent.getAllParent, payload);
};

export const createParent = async (query: CreateParentQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.parent.addParent, payload);
};

export const updateParent = async (query: UpdateParentQuery) => {
  const { token, parentId, ...payload } = query;
  const endpoint = APIs.admin.parent.updateParent.replace('{parentId}', `${parentId}`);
  return new apiClient(token || '').put(endpoint, payload);
};

export const removeParent = async (query: ParentDetailQuery) => {
  const { token, parentId } = query;
  const endpoint = APIs.admin.parent.deleteParent.replace('{parentId}', `${parentId}`);
  return new apiClient(token || '').delete(endpoint);
};

export const getTeacherList = async (query: ListWithPaginationQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.teacher.getAllTeacher, payload);
};

export const createTeacher = async (query: CreateTeacherQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.teacher.addTeacher, payload);
};

export const updateTeacher = async (query: UpdateTeacherQuery) => {
  const { token, teacherId, ...payload } = query;
  const endpoint = APIs.admin.teacher.updateTeacher.replace('{teacherId}', `${teacherId}`);
  return new apiClient(token || '').put(endpoint, payload);
};

export const removeTeacher = async (query: TeacherDetailQuery) => {
  const { token, teacherId } = query;
  const endpoint = APIs.admin.teacher.deleteTeacher.replace('{teacherId}', `${teacherId}`);
  return new apiClient(token || '').delete(endpoint);
};

export const getStudentList = async (query: ListWithPaginationQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.student.getAllStudent, payload);
};

export const removeStudent = async (query: StudentDetailTokenQuery) => {
  const { token, studentId } = query;
  const endpoint = APIs.admin.student.deleteStudent.replace('{studentId}', `${studentId}`);
  return new apiClient(token || '').delete(endpoint);
};

export const getTeacherAssignmentList = async (query: ListWithPaginationQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(
    APIs.admin.teacherAssignment.getAllTeacherAssignment,
    payload
  );
};

export const createTeacherAssignment = async (query: CreateTeacherAssignmentQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(
    APIs.admin.teacherAssignment.addTeacherAssignment,
    payload
  );
};

export const updateTeacherAssignment = async (query: UpdateTeacherAssignmentQuery) => {
  const { token, teacherAssignmentId, ...payload } = query;
  const endpoint = APIs.admin.teacherAssignment.updateTeacherAssignment.replace(
    '{teacherAssignmentId}',
    `${teacherAssignmentId}`
  );
  return new apiClient(token || '').put(endpoint, payload);
};

export const removeTeacherAssignment = async (query: TeacherAssignmentDetailQuery) => {
  const { token, teacherAssignmentId } = query;
  const endpoint = APIs.admin.teacherAssignment.deleteTeacherAssignment.replace(
    '{teacherAssignmentId}',
    `${teacherAssignmentId}`
  );
  return new apiClient(token || '').delete(endpoint);
};

export const getSubjectList = async (query: ListWithPaginationQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.subject.getAllSubject, payload);
};

export const createSubject = async (query: CreateSubjectQuery) => {
  const { token, ...payload } = query;
  return new apiClient(token || '').post(APIs.admin.subject.addSubject, payload);
};

export const updateSubject = async (query: UpdateSubjectQuery) => {
  const { token, subjectId, ...payload } = query;
  const endpoint = APIs.admin.subject.updateSubject.replace('{subjectId}', `${subjectId}`);
  return new apiClient(token || '').put(endpoint, payload);
};

export const removeSubject = async (query: SubjectDetailQuery) => {
  const { token, subjectId } = query;
  const endpoint = APIs.admin.subject.deleteSubject.replace('{subjectId}', `${subjectId}`);
  return new apiClient(token || '').delete(endpoint);
};
