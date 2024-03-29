import { RootState } from '../../types';
import { initialState } from '../slices/teacher';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state.teacher || initialState;

export const getTeacherAssignmentDetail = createSelector(
  [selectDomain],
  (state) => state.data.assignment
);
export const getTeacherLoading = createSelector([selectDomain], (state) => state.loading);
export const getTeacherError = createSelector([selectDomain], (state) => state.error);
