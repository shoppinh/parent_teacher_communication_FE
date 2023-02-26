import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiForgotPassword,
  apiForgotSetPassword,
  apiForgotVerifyCode,
  apiGetUserInfo,
  apiRegister,
  apiResendCode,
  apiSetPassword,
  apiVerifyCode,
} from 'services/api/apiHelper';
import { registerActions as actions } from 'store/slices/register';
import { RegisterPayload } from 'types/Register';

interface RegisterDataRespose {
  _id: string;
  roleId: string;
  userName: string;
  mobilePhone: string;
  codeExpiredSecond: number;
}

interface VerifyDataResponse {
  userId: number;
  code: string;
  status: true;
  message: string;
}

export function* registerSaga() {
  yield all([
    takeLatest(actions.doRegister.type, doRegister),
    takeLatest(actions.doVerifyCode.type, doVerifyCode),
    takeLatest(actions.doReSendCode.type, doResendCode),
    takeLatest(actions.doSetPassword.type, doSetPassword),
    takeLatest(actions.checkIsAccountExists.type, checkAccountExists),
    takeLatest(actions.doForgotPassword.type, doForgotPassword),
    takeLatest(actions.doForgotVerifyCode.type, doForgotVerifyCode),
    takeLatest(actions.doForgotSetPassword.type, doForgotSetPassword),
  ]);
}

const ParseRegister = (response: RegisterDataRespose): RegisterPayload => ({
  user: {
    _id: response._id,
    userName: response.userName,
    roleId: response.roleId,
    mobilePhone: response.mobilePhone,
  },
  codeExpiredTime: response.codeExpiredSecond,
});

export function* doRegister({ payload }: any) {
  try {
    const response = yield call(apiRegister, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateUser(ParseRegister(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

const ParseVerify = (response: VerifyDataResponse): RegisterPayload => ({
  user: null,
  isVerified: response.status,
});

export function* doVerifyCode({ payload }: any) {
  try {
    const response = yield call(apiVerifyCode, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateVerify(ParseVerify(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doResendCode({ payload }: any) {
  try {
    const response = yield call(apiResendCode, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateVerify({
          ...ParseVerify(response.data.data),
          isSentReSend: true,
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doSetPassword({ payload }: any) {
  try {
    const response = yield call(apiSetPassword, payload);
    if (response.data && response.data.status) {
      yield put(actions.completeRegister());
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* checkAccountExists({ payload }: any) {
  try {
    const response = yield call(apiGetUserInfo, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.checkedIsAccountExists({
          isAccountExists: response.data.data.user.isActive,
        })
      );
    } else {
      yield put(
        actions.checkedIsAccountExists({
          isAccountExists: false,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doForgotPassword({ payload }: any) {
  try {
    const response = yield call(apiForgotPassword, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateForgotUserId({
          forgotUserId: response.data.data.consumerId,
          forgotMobilePhone: payload.phone,
          codeExpiredTime: response.data.data.codeExpiredSecond,
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doForgotVerifyCode({ payload }: any) {
  try {
    const response = yield call(apiForgotVerifyCode, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateVerify(ParseVerify(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doForgotSetPassword({ payload }: any) {
  try {
    const response = yield call(apiForgotSetPassword, payload);
    if (response.data && response.data.status) {
      yield put(actions.completeRegister());
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
