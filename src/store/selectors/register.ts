import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/register';


// First select the relevant part from the state
const selectDomain = (state: RootState) => state.register || initialState;

export const getRegisterUser = createSelector(
    [selectDomain],
    state => state.data.user,
);

export const getCodeExpiredTime =  createSelector(
    [selectDomain],
    state => state.data.codeExpiredTime,
);

export const getIsVerified = createSelector(
    [selectDomain],
    state => state.data.isVerified,
);

export const getIsSentReSend = createSelector(
    [selectDomain],
    state => state.data.isSentReSend
);

export const getRegisterIsAccountExists = createSelector(
    [selectDomain],
    state => state.data.isAccountExists,
);

export const getRegisterCheckedAccountExists = createSelector(
    [selectDomain],
    state => state.data.isCheckedAccount,
);

export const getRegisterError = createSelector(
    [selectDomain],
    state => state.error,
);

export const getRegisterSuccess = createSelector(
    [selectDomain],
    state => state.data.isRegisterSuccess,
);

export const getForgotUserId = createSelector(
    [selectDomain],
    state => state.data.forgotUserId,
);

export const getForgotMobilePhone = createSelector(
    [selectDomain],
    state => state.data.forgotMobilePhone,
);
