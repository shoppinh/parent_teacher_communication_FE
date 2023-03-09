import { createSelector } from '@reduxjs/toolkit';
import { initialState } from 'store/slices/class';
import { RootState } from 'types';

const selectDomain = (state: RootState) => state.class || initialState;
export const getClassList = createSelector([selectDomain], (state) => state.data.classes);

export const getClassListLoading = createSelector([selectDomain], (state) => state.loading);
export const getClassListError = createSelector([selectDomain], (state) => state.error);
