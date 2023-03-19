import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/config';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.config || initialState;

export const getConfigAdminPhone = createSelector(
  [selectDomain],
  (state) => state.data.admin?.mobilePhone
);

export const getConfigLastUpdated = createSelector(
  [selectDomain],
  (state) => state.data.lastUpdated
);

export const getConfigLanguage = createSelector([selectDomain], (state) => state.data.languages);
export const getSystemSettings = createSelector(
  [selectDomain],
  (state) => state.data.systemSettings
);
export const getSchoolInfo = createSelector([selectDomain], (state) => state?.data?.systemSettings?.schoolInfo);
export const getUserList = createSelector([selectDomain], (state) => state?.data?.systemSettings?.userList);