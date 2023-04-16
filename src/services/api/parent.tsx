import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { AddLeaveFormQuery, StudentLeaveFormListQuery, UpdateLeaveFormQuery } from 'types/Student';

export const submitLeaveForm = async (query: AddLeaveFormQuery) => {
  const { token, ...leaveFormPayload } = query;
  return new apiClient(token || '').post(APIs.parent.leaveForm.submitLeaveForm, leaveFormPayload);
};

export const updateLeaveForm = async (query: UpdateLeaveFormQuery) => {
  const { token, formId, ...leaveFormPayload } = query;
  const endPoint = APIs.parent.leaveForm.updateLeaveForm.replace('{formId}', formId);
  return new apiClient(token || '').put(endPoint, leaveFormPayload);
};

export const getStudentLeaveFormList = async (query: StudentLeaveFormListQuery) => {
  const { token, studentId } = query;
  const endPoint = APIs.student.leaveForm.getLeaveFormListByStudent.replace(
    '{studentId}',
    studentId
  );
  return new apiClient(token || '').post(endPoint);
};
