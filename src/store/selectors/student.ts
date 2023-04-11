import { RootState } from '../../types';
import { initialState } from '../slices/student';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state.student || initialState;

export const getStudentList = createSelector([selectDomain], (state) => state.data.data);
export const getStudentLoading = createSelector([selectDomain], (state) => state.loading);

export const getStudentError = createSelector([selectDomain], (state) => state.error);

export const getUnassignedStudentList = createSelector(
  [selectDomain],
  (state) => state.data?.unassignedStudent?.data
);
