import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/device';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.device || initialState;

export const getIsIOS = () => {
  return createSelector([selectDomain], (state) => state.data.isIOS);
};
