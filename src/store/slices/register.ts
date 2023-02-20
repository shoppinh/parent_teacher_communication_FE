import { PayloadAction } from '@reduxjs/toolkit';
import { registerSaga } from 'store/sagas/registerSaga';
import {
  AccountExistsQuery,
  ForgotPayload,
  ForgotQuery,
  RegisterError,
  RegisterPayload,
  RegisterQuery,
  RegisterState,
  ResendCodeQuery,
  SetPasswordQuery,
  VerifyQuery,
} from 'types/Register';
import { AuthQuery } from 'types/Session';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

export const initialState: RegisterState = {
  data: {
    user: null,
    forgotUserId: NaN,
    isVerified: false,
    isRegisterSuccess: false,
    isSentReSend: false,
    isAccountExists: false,
    isCheckedAccount: false,
  },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearRegisterRedux(state) {
      state.data.isAccountExists = false;
      state.data.isCheckedAccount = false;
      state.error = null;
    },
    checkIsAccountExists(state, action: PayloadAction<AuthQuery>) {
      state.data.isAccountExists = false;
      state.data.isCheckedAccount = false;
      state.error = null;
      state.loading = true;
    },
    checkedIsAccountExists(state, action: PayloadAction<AccountExistsQuery>) {
      state.data.isAccountExists = action.payload.isAccountExists;
      state.data.isCheckedAccount = true;
      state.loading = false;
    },
    updateUser(state, action: PayloadAction<RegisterPayload>) {
      state.data.user = action.payload.user;
      state.data.isAccountExists = false;
      state.data.codeExpiredTime = action.payload.codeExpiredTime;
      state.loading = false;
    },
    updateVerify(state, action: PayloadAction<RegisterPayload>) {
      state.data.isVerified = action.payload.isVerified;
      state.data.isSentReSend = action.payload.isSentReSend;
      state.loading = false;
    },
    doRegister(state, action: PayloadAction<RegisterQuery>) {
      state.data = initialState.data;
      state.loading = true;
      state.error = null;
    },
    doVerifyCode(state, action: PayloadAction<VerifyQuery>) {
      state.error = null;
      state.data.isVerified = false;
      state.loading = true;
    },
    doSetPassword(state, action: PayloadAction<SetPasswordQuery>) {
      state.error = null;
      state.loading = true;
    },
    doReSendCode(state, action: PayloadAction<ResendCodeQuery>) {
      state.error = null;
      state.data.isSentReSend = false;
      state.loading = true;
    },
    completeRegister(state) {
      state.loading = false;
      state.data.user = initialState.data.user;
      state.data.isRegisterSuccess = true;
    },
    doForgotPassword(state, action: PayloadAction<ForgotQuery>) {
      state.data = initialState.data;
      state.loading = true;
      state.error = null;
    },
    updateForgotUserId(state, action: PayloadAction<ForgotPayload>) {
      state.data.forgotUserId = action.payload.forgotUserId;
      state.data.isAccountExists = true;
      state.data.forgotMobilePhone = action.payload.forgotMobilePhone;
      state.data.codeExpiredTime = action.payload.codeExpiredTime;
      state.loading = false;
    },
    doForgotVerifyCode(state, action: PayloadAction<VerifyQuery>) {
      state.loading = true;
      state.data.isVerified = false;
      state.error = null;
    },
    doForgotSetPassword(state, action: PayloadAction<SetPasswordQuery>) {
      state.error = null;
      state.loading = true;
    },
    Error(state, action: PayloadAction<RegisterError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { name, actions: registerActions, reducer } = slice;

export const useRegisterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerSaga });
  return {
    actions: registerActions,
  };
};
