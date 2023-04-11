import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/event';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.event || initialState;

export const getEventList = createSelector([selectDomain], (state) => state.data);
export const getEventLoading = createSelector([selectDomain], (state) => state.loading);
export const getEventError = createSelector([selectDomain], (state) => state.error);
export const getEventActionLoading = createSelector([selectDomain], (state) => state.actionLoading);