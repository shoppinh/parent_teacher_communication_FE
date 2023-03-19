import { RootState } from '../../types';
import { initialState } from '../slices/progress';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state.progress || initialState;

export const getProgressList = createSelector([selectDomain], (state) => state.data);
export const getCurrentProgress = createSelector(
  [selectDomain],
  (state) => state.data.currentProgress
);
export const getProgressLoading = createSelector([selectDomain], (state) => state.loading);
export const getProgressError = createSelector([selectDomain], (state) => state.error);
export const getCurrentProgressLoading = createSelector(
  [selectDomain],
  (state) => state.currentProgressLoading
);