import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/system';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.system || initialState;

export const getEntryType = createSelector([selectDomain], (state) => state.data.entryType);

export const getAccessPageTime = createSelector(
  [selectDomain],
  (state) => state.data.accessPageTime
);
