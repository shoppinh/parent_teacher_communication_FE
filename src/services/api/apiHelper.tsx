import { call } from 'redux-saga/effects';
import * as api from './index';
import {
  DeviceTokenQuery,
  RegisterQuery,
  ResendCodeQuery,
  SetPasswordQuery,
  VerifyQuery,
} from 'types/Register';
import { AuthQuery, LogoutQuery, RefreshTokenQuery, SocialRegisterPayload } from 'types/Session';
import { LanguageQuery } from 'types/Config';
import { ConversationDetailQuery, ConversationRoomQuery } from 'types/Conversation';
import { FileQuery, MenuImportQuery } from 'types/Admin/Import';
import {
  ActiveOutletPartnerQuery,
  DeactivateOutletPartnerQuery,
  FetchMenuPartnerQuery,
  MenuExportQuery,
  MenusOutletQuery,
  ProductNotesQuery,
  ZNSQuery,
} from 'types/Admin/Menu';
import { OutletListQuery } from 'types/Admin/Outlet';

export function* apiLogin(query: AuthQuery) {
  return yield call(api.login, query);
}

export function* apiAdminLogin(query: AuthQuery) {
  return yield call(api.adminLogin, query);
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

export function* apiVerifyCode(query: VerifyQuery) {
  return yield call(api.verifyCode, query);
}

export function* apiResendCode(query: ResendCodeQuery) {
  return yield call(api.reSendCode, query);
}

export function* apiSetPassword(query: SetPasswordQuery) {
  return yield call(api.setPassword, query);
}

export function* apiForgotPassword(query: AuthQuery) {
  return yield call(api.forgotPassword, query);
}

export function* apiForgotVerifyCode(query: VerifyQuery) {
  return yield call(api.forgotVerifyCode, query);
}

export function* apiForgotSetPassword(query: SetPasswordQuery) {
  return yield call(api.forgotSetPassword, query);
}

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

export function* apiGetCountUnreadRoom(query: ConversationRoomQuery) {
  return yield call(api.getCountUnreadRoom, query);
}

export function* apiDoSocialRegister(query: SocialRegisterPayload) {
  return yield call(api.doSocialRegister, query);
}

export function* apiUpdateLanguage(query: LanguageQuery) {
  return yield call(api.updateLanguage, query);
}

// Admin Helper

export function* apiDoUploadExcelMenuFile(query: FileQuery) {
  return yield call(api.uploadExcelMenuFile, query);
}

export function* apiDoUploadImageMenuFile(query: FileQuery) {
  return yield call(api.uploadImageMenuFile, query);
}

export function* apiAdminMenuImport(query: MenuImportQuery) {
  return yield call(api.adminMenuImport, query);
}

export function* apiDoFetchOutletList(query: OutletListQuery) {
  return yield call(api.fetchOutletList, query);
}

export function* apiDoFetchMenusOutlet(query: MenusOutletQuery) {
  return yield call(api.fetchMenusOutlet, query);
}

export function* apiGetAllThirdParty(query: MenusOutletQuery) {
  return yield call(api.getAllThirdParty, query);
}

export function* apiGetExportDataMenu(query: MenuExportQuery) {
  return yield call(api.getExportDataMenu, query);
}

export function* apiDoActiveOutletPartner(query: ActiveOutletPartnerQuery) {
  return yield call(api.doActiveOutletPartner, query);
}

export function* apiDoDeactivateOutletPartner(query: DeactivateOutletPartnerQuery) {
  return yield call(api.doDeactivateOutletPartner, query);
}

export function* apiDoFetchMenuPartnerData(query: FetchMenuPartnerQuery) {
  return yield call(api.doFetchMenuPartnerData, query);
}

export function* apiDoFetchOutlet(query: MenusOutletQuery) {
  return yield call(api.fetchOutletDetail, query);
}

export function* apiDoEnableProductNotes(query: ProductNotesQuery) {
  return yield call(api.doEnableProductNotes, query);
}

export function* apiDoEnableZNS(query: ZNSQuery) {
  return yield call(api.doEnableZNS, query);
}
