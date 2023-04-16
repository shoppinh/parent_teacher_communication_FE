import { RootState } from '../../types';
import { initialState } from '../slices/parent';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state.parent || initialState;

export const getParentLoading = createSelector([selectDomain], (state) => state.loading);
export const getParentError = createSelector([selectDomain], (state) => state.error);
export const getLeaveFormList = createSelector([selectDomain], (state) => state.data.leaveFormList);
