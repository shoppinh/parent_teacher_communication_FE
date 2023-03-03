import { call } from 'redux-saga/effects';
import * as api from './index';
import { DeviceTokenQuery, RegisterQuery } from 'types/Register';
import { AuthQuery, LogoutQuery, RefreshTokenQuery } from 'types/Session';
import { LanguageQuery } from 'types/Config';
import {
  ConversationDetailQuery,
  ConversationListQuery,
  ConversationRoomQuery,
  PushNotificationQuery,
} from 'types/Conversation';
import { TeacherDetailQuery } from '../../types/Teacher';

export function* apiLogin(query: AuthQuery) {
  return yield call(api.login, query);
}

export function* apiLogout(query: LogoutQuery) {
  return yield call(api.logout, query);
}

export function* apiRefreshToken(query: RefreshTokenQuery) {
  return yield call(api.refreshToken, query);
}

export function* apiRegister(query: RegisterQuery) {
  return yield call(api.register, query);
}

// export function* apiVerifyCode(query: VerifyQuery) {
//   return yield call(api.verifyCode, query);
// }
//
// export function* apiResendCode(query: ResendCodeQuery) {
//   return yield call(api.reSendCode, query);
// }
//
// export function* apiSetPassword(query: SetPasswordQuery) {
//   return yield call(api.setPassword, query);
// }

// export function* apiForgotPassword(query: ForgotQuery) {
//   return yield call(api.forgotPassword, query);
// }
//
// export function* apiForgotVerifyCode(query: VerifyQuery) {
//   return yield call(api.forgotVerifyCode, query);
// }

// export function* apiForgotSetPassword(query: SetPasswordQuery) {
//   return yield call(api.forgotSetPassword, query);
// }

export function* apiRegisterDeviceToken(query: DeviceTokenQuery) {
  return yield call(api.registerDeviceToken, query);
}

export function* apiGetPlatformSetting() {
  return yield call(api.getPlatformSetting);
}

export function* apiGetUserInfo(query: AuthQuery) {
  return yield call(api.getUserInfo, query);
}

export function* apiGetConversationDetail(query: ConversationDetailQuery) {
  return yield call(api.getConversationDetail, query);
}

export function* apiGetConversationList(query: ConversationListQuery) {
  return yield call(api.getConversationListOfUser, query);
}

export function* apiSendPushNotification(query: PushNotificationQuery) {
  return yield call(api.sendPushNotification, query);
}

export function* apiGetCountUnreadRoom(query: ConversationRoomQuery) {
  return yield call(api.getCountUnreadRoom, query);
}

export function* apiUpdateLanguage(query: LanguageQuery) {
  return yield call(api.updateLanguage, query);
}

// Admin Helper

export function* apiFetchTeacherDetail(query: TeacherDetailQuery) {
  return yield call(api.fetchTeacherDetail, query);
}
