import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiGetCountUnreadRoom,
  apiGetUserProfile,
  apiLogin,
  apiLogout,
  apiRefreshToken,
  apiRegisterDeviceToken,
  apiUpdateUserInfo,
} from 'services/api/apiHelper';
import { sessionActions as actions } from 'store/slices/session';
import { AuthPayLoad, UpdateUserQuery } from 'types/Session';
import { User } from 'types/User';
import { _FORCE_REFRESH_KEY, PREVIOUS_STORAGE_KEY } from 'utils/constants';
import i18next from 'i18next';

interface LoginDataRespose {
  accessToken: string;
  refreshToken: string;
  userId: string;
  mobilePhone: string;
  username: string;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  fullname: string;
  tokenType: string;
  expiresIn: number;
  expiresDate: string;
  isActive: boolean;
  lastLoggedIn: string;
  avatar: string;
}

export function* sessionSaga() {
  yield all([
    takeLatest(actions.doLogin.type, doLogin),
    takeLatest(actions.doLogout.type, doLogout),
    takeLatest(actions.doRegisterDeviceToken.type, doRegisterDeviceToken),
    takeLatest(actions.doRefreshToken.type, doRefreshToken),
    takeLatest(actions.getCountUnreadRoom.type, getCountUnreadRoom),
    takeLatest(actions.doGetUserProfile.type, getUserProfile),
    takeLatest(actions.updateUserInfo.type, updateUserInfo),
  ]);
}

const ParseLogin = (
  username: string,
  rememberMe: boolean,
  response: LoginDataRespose
): AuthPayLoad => ({
  phoneNumber: response.mobilePhone,
  accessToken: response.accessToken,
  refreshToken: response.refreshToken,
  rememberMe: rememberMe,
  lastLogin: response.accessToken === '' ? '' : new Date().toISOString(),
  user: {
    data: {
      _id: response.userId,
      username: response.username,
      firstname: response.firstname,
      lastname: response.lastname,
      fullname: response.fullname,
      email: response.email,
      mobilePhone: response.mobilePhone,
      isActive: response.isActive,
      roleId: response.role,
      lastLoggedIn: response.lastLoggedIn,
      avatar: response.avatar,
    },
  },
});

export function* doLogin({ payload }: any) {
  try {
    const response = yield call(apiLogin, payload);
    if (response.data && response.data.status) {
      const authData = ParseLogin(payload.username, payload.rememberMe, response.data.data);
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

const parseUserData = (data: any): User => {
  return {
    _id: data._id,
    email: data.email,
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname,
    fullname: data.fullname,
    mobilePhone: data.mobilePhone,
    isActive: data.isActive,
    roleId: data.role,
    avatar: data.avatar,
  };
};

export const parseUserList = (data: any): User[] => {
  return data.map((item: any) => parseUserData(item));
};

export function* getUserProfile({ payload }: any) {
  try {
    const response = yield call(apiGetUserProfile, payload);

    if (response.data && response.data.status) {
      yield put(actions.doGetUserProfileSuccess(response.data.data));
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

export function* updateUserInfo({ payload }: { type: string; payload: UpdateUserQuery }) {
  try {
    const response = yield call(apiUpdateUserInfo, payload);
    if (response.data && response.data.status) {
      yield put(actions.updatedUserInfo({ user: parseUserData(response.data.data) }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
