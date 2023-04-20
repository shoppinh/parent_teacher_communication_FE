import { createSelector } from '@reduxjs/toolkit';
import { initialState } from 'store/slices/class';
import { RootState } from 'types';

const selectDomain = (state: RootState) => state.class || initialState;
export const getClassList = createSelector([selectDomain], (state) => state.data.classes);

export const getClassLoading = createSelector([selectDomain], (state) => state.loading);
export const getClassListError = createSelector([selectDomain], (state) => state.error);
export const getCurrentClass = createSelector([selectDomain], (state) => state.data.currentClass);
export const getCurrentLeaveFormList = createSelector(
  [selectDomain],
  (state) => state.data.currentClass.leaveForm
);
export const getActionLoading = createSelector([selectDomain], (state) => state.actionLoading);