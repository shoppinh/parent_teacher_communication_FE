import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/session';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.session || initialState;

export const getPhone = createSelector([selectDomain], (state) => state.data.auth?.phoneNumber);

export const getUser = createSelector([selectDomain], (state) => state.data.auth?.user?.data);

export const getUserProfile = createSelector([selectDomain], (state) => state.data?.profile);
export const getAuthLoading = createSelector([selectDomain], (state) => state.loading);

export const getAccessToken = createSelector(
  [selectDomain],
  (state) => state.data.auth?.accessToken
);

export const getFcmToken = createSelector([selectDomain], (state) => state.data.auth?.fcmToken);

export const getRefreshToken = createSelector(
  [selectDomain],
  (state) => state.data.auth?.refreshToken
);

export const getAuthError = createSelector([selectDomain], (state) => state.error);

export const getSessionCountUnread = (roomId: number) => {
  return createSelector([selectDomain], (state) => {
    if (state.data.auth?.user?.notifications) {
      return state.data.auth?.user?.notifications[roomId];
    }
    return undefined;
  });
};
