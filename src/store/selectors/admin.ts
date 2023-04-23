import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/admin';

const selectDomain = (state: RootState) => state.admin || initialState;

export const getAdminError = createSelector([selectDomain], (state) => state.error);

export const getAdminLoading = createSelector([selectDomain], (state) => state.loading);

export const getAdminConfigPartner = createSelector(
  [selectDomain],
  (state) => state.data.config?.partners
);

export const getParentList = createSelector(
  [selectDomain],
  (state) => state.data.parent?.parentList
);

export const getTeacherList = createSelector(
  [selectDomain],
  (state) => state.data.teacher?.teacherList
);

export const getStudentList = createSelector(
  [selectDomain],
  (state) => state.data.student?.studentList
);

export const getSubjectList = createSelector(
  [selectDomain],
  (state) => state.data.subject?.subjectList
);

export const getTeacherAssignmentList = createSelector(
  [selectDomain],
  (state) => state.data.teacherAssignment?.teacherAssignmentList
);

export const getAdminActionLoading = createSelector([selectDomain], (state) => state.actionLoading);
