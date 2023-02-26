import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAdminLogin,
  apiGetCountUnreadRoom,
  apiGetUserInfo,
  apiLogin,
  apiLogout,
  apiRefreshToken,
  apiRegisterDeviceToken,
} from 'services/api/apiHelper';
import { sessionActions as actions } from 'store/slices/session';
import { AuthPayLoad } from 'types/Session';
import { User } from 'types/User';
import { _FORCE_REFRESH_KEY, PREVIOUS_STORAGE_KEY } from 'utils/constants';
import i18next from 'i18next';

interface LoginDataRespose {
  token: string;
  refreshToken: string;
  user: User;
}

export function* sessionSaga() {
  yield all([
    takeLatest(actions.doLogin.type, doLogin),
    takeLatest(actions.doAdminLogin.type, doAdminLogin),
    takeLatest(actions.doLogout.type, doLogout),
    takeLatest(actions.doRegisterDeviceToken.type, doRegisterDeviceToken),
    takeLatest(actions.doRefreshToken.type, doRefreshToken),
    takeLatest(actions.getCountUnreadRoom.type, getCountUnreadRoom),
  ]);
}

const ParseLogin = (
  phone: string,
  rememberMe: boolean,
  response: LoginDataRespose
): AuthPayLoad => ({
  phoneNumber: phone,
  accessToken: response.token,
  refreshToken: response.refreshToken,
  rememberMe: rememberMe,
  lastLogin: response.token === '' ? '' : new Date().toISOString(),
  user: {
    data: response.user,
  },
});

export function* doLogin({ payload }: any) {
  try {
    const response = yield call(apiLogin, payload);
    if (response.data && response.data.status) {
      const authData = ParseLogin(payload.phone, payload.rememberMe, response.data.data);
      const userData = authData?.user;
      if (userData?.data?.userSettings && userData?.data?.userSettings.lang) {
        i18next.changeLanguage(userData?.data?.userSettings.lang);
      }
      yield put(actions.updateAuth(authData));
      localStorage.setItem(PREVIOUS_STORAGE_KEY, JSON.stringify(authData));
      setTimeout(() => {
        localStorage.setItem(_FORCE_REFRESH_KEY, 'true');
      }, 1500);
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doAdminLogin({ payload }: any) {
  try {
    const response = yield call(apiAdminLogin, payload);
    if (response.data && response.data.status) {
      const authData = ParseLogin(payload.phone, payload.rememberMe, response.data.data);
      const userData = authData?.user;
      if (userData?.data?.roleId && parseInt(userData?.data?.roleId) === 1) {
        yield put(actions.updateAuth(authData));
        localStorage.setItem(PREVIOUS_STORAGE_KEY, JSON.stringify(authData));
        setTimeout(() => {
          localStorage.setItem(_FORCE_REFRESH_KEY, 'true');
        }, 1500);
      } else {
        yield put(
          actions.Error({
            code: 111,
            message: i18next.t('admin.youDontHavePermissionToAccess') as string,
          })
        );
      }
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doLogout({ payload }: any) {
  try {
    const response = yield call(apiLogout, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateAuth({}));
      localStorage.removeItem(PREVIOUS_STORAGE_KEY);
      setTimeout(() => {
        localStorage.setItem(_FORCE_REFRESH_KEY, 'true');
      }, 1500);
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

const ParseUserData = (data: any): User => {
  return {
    _id: data._id,
    email: data.email,
    userName: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: data.fullName,
    mobilePhone: data.mobilePhone,
    isActive: data.isActive,
  };
};

export function* getUserInfo({ payload }: any) {
  try {
    const response = yield call(apiGetUserInfo, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateUserInfo({
          user: ParseUserData(response.data.data),
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doRefreshToken({ payload }: any) {
  try {
    const response = yield call(apiRefreshToken, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateAuth({
          accessToken: response.data.data.token,
          refreshToken: response.data.data.refreshToken,
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doRegisterDeviceToken({ payload }: any) {
  try {
    const response = yield call(apiRegisterDeviceToken, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateRegisterDeviceToken(payload));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getCountUnreadRoom({ payload }: any) {
  try {
    const response = yield call(apiGetCountUnreadRoom, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateCountUnreadRoom({
          roomId: response.data?.data?.roomId,
          countUnread: response.data?.data?.countUnread,
          userId: response.data?.data?.userId,
          roleId: response.data?.data?.roleId,
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
