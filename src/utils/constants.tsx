import SiteMap from './sitemap';
import { NewConversationPayload } from '../types/Conversation';

export const TOAST_DEFAULT_TIME = 2000;

export const STORAGE_KEY = '_storage';

export const SESSION_STORAGE_KEY = '_session';

export const COOKIE_STORAGE_KEY = '_session_ck';

export const PREVIOUS_STORAGE_KEY = '_pva_1k7vqIBfznlpzG7cKWPt';

export const _FORCE_REFRESH_KEY = '_refresh_Qa5On';

export const _IS_SECOND_HISTORY = '_is_second_Qa5On';

export const _PATH_HISTORY = '_path_history_Qa5On';

export const REQUIRE_SEARCH_LENGTH = 2;

export const OTPLength = 6;

export const OTPTimeOut = 180;

export enum queryString {
  menuGUID = 'menuGUID',
  roomId = 'roomId',
  classId = 'classId',
  section = 'section',
  search = 'search',
  preview = 'preview',
  type = 'type',
  token = 'token',
  phone = 'phone',
  cart = 'cart',
  conversation = 'conversation',
  offset = 'offset',
  limit = 'limit',
}

export enum DateFormat {
  WEEK_DAY = 'EEE',
  FULL_WEEK_DAY = 'EEEE',
  HOUR_MINUTE = 'HH:mm',
  MINUTE_SECONDS = 'mm:ss',
  OUTLET_CLOSED_HOUR = 'hh:mmA',
  HOUR_MINUTE_SECOND = 'HH:mm:ss',
  FULL_DATE_HOUR_MINUTE = 'dd MMMM yyyy, HH:mm',
  ORDER_FULL_DATE_HOUR_MINUTE = 'dd/MM/yyyy, HH:mm',
  LOG_FULL_DATE_HOUR_MINUTE = 'dd/MM/yyyy, HH:mm:ss',
  FULL_DATE = 'dd MMMM yyyy',
}

export enum ConstantRoles {
  SUPER_USER = 'SUPER_USER',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
}

export enum ConstantRolesNumber {
  SUPER_USER = 1,
  TEACHER = 2,
  PARENT = 3,
}

export enum actionTypes {
  TYPE_REGISTER = 'TYPE_REGISTER',
  TYPE_CHECKOUT = 'TYPE_CHECKOUT',
  TYPE_FORGOT_PASSWORD = 'TYPE_FORGOT_PASSWORD',
  TYPE_CONVERSATION_LOGIN = 'TYPE_CONVERSATION_LOGIN',
}

// duplicate ToastPosition
type UToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export const dialogOption = {
  addedCart: {
    position: 'top-right' as UToastPosition,
    newestOnTop: true,
  },
  notified: {
    position: 'top-right' as UToastPosition,
    newestOnTop: true,
  },
};

export const ConstantPostType = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const AdminContact: NewConversationPayload = {
  roleId: ConstantRolesNumber.SUPER_USER.toString(),
  mobilePhone: '0397273869',
  _id: 'admin',
};

export type SORT_TYPE = 'asc' | 'desc' | -1 | 1;
export const ROWS_PER_PAGE = 10;

export const GENDERS = ['female','male']

export { SiteMap };
