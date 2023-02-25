import SiteMap from './sitemap';

export const DELIVERY_TEL = ' - TEL:';

export const SECTION_PREFIX = 'uCat_';

export const SECTION_NAV_PREFIX = 'uCatNav_';

export const DEFAULT_TIME = '00:00:00';

export const DEFAULT_DATE_TIME = '2000-12-31T17:00:00.000Z';

export const DEFAULT_SEARCH_LIMIT = 20;

export const DEFAULT_ADMIN_MENU_GUID = 'default-admin-menu-guid';

export const DEFAULT_DELIVERY_NAME = 'delivery.muaNgayDelivery';

export const ZEEK_DELIVERY_NAME = 'delivery.zeekDelivery';

export const TOAST_DEFAULT_TIME = 2000;

export const TOAST_ADD_CARD_DEFAULT_TIME = 1200;

export const TOAST_PRODUCT_DETAIL_ID = 'toast_Qa5On';

export const PRODUCT_DETAIL_DESC_LINE = 2;

// for 320px width device ~ just average
export const PRODUCT_DETAIL_DESC_MINIMUM_LENGTH = 38;

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

export const CHECK_ORDER_TIME_INTERVAL = 5000;

export const ZALO_CHAT_URI = 'https://zalo.me/';

export const ZALO_MINI_APP_URI = 'https://zalo.me/app/link/zapps/4076912130205911270';

export const ADMIN_TEMPLATE_IMPORT_FILE = '/static/admin/TemplateImportMenu.xlsx';

export const HOTLINE = '1800 282863';

export const ZALO_MINI_APP_EPAY_CB_QUERY = 'ePayCallbackUrl';

export const OUTLET_LIST_PAGE_SIZE = 20;

export const PAGING_SHOWING_ITEM = 3;

export enum queryString {
  menuGUID = 'menuGUID',
  orderGUID = 'orderGUID',
  product = 'product',
  section = 'section',
  returnUrl = 'returnUrl',
  search = 'search',
  preview = 'preview',
  type = 'type',
  token = 'token',
  phone = 'phone',
  orderId = 'orderId',
  invoiceNo = 'invoiceNo',
  cart = 'cart',
  conversation = 'conversation',
  tableId = 'tableId',
  outletId = 'outletId',
  offset = 'offset',
  limit = 'limit',
  showItems = 'showItems',
}

export enum queryStringEPay {
  trxId = 'trxId',
  merId = 'merId',
  merTrxId = 'merTrxId',
  resultCd = 'resultCd',
  resultMsg = 'resultMsg',
  invoiceNo = 'invoiceNo',
  amount = 'amount',
  payType = 'payType',
  merchantToken = 'merchantToken',
  transDt = 'transDt',
  transTm = 'transTm',
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

export const ImageSize = {
  MODAL: {
    width: 111,
    height: 111,
  },
  MODAL_LOGO: {
    width: 45,
    height: 39,
  },
  CONTENT_PAGE: {
    width: 194,
    height: 144,
  },
  TC: {
    width: 129,
    height: 134,
  },
  PROMOTION: {
    width: 42,
    height: 28,
  },
  ORDER_THUMB: {
    width: 69,
    height: 69,
  },
  CART_THUMB: {
    width: 90,
    height: 90,
  },
  GIFT_THUMB: {
    width: 60,
    height: 60,
  },
  GIFT_LIST: {
    width: 53,
    height: 53,
  },
  GIFT_DETAIL: {
    width: 45,
    height: 45,
  },
  PRODUCT_LIST: {
    width: 200,
    height: 200,
  },
  PRODUCT_DETAIL: {
    width: 351,
    height: 351,
  },
  LANDING_PHONE: {
    width: 320,
    height: 640,
  },
  LANDING_BG: {
    width: 2560,
    height: 1540,
  },
  LANDING_BG_MOB: {
    width: 750,
    height: 2200,
  },
  DOWNLOAD_ICON: {
    width: 135,
    height: 40,
  },
};

export const DeliveryMapper = {
  DELIVERY: 'delivery.delivery',
  ZEEK: 'delivery.zeek',
  PICKUP: 'delivery.pickup',
  DINE_IN: 'delivery.dineIn',
};

export enum Pattern {
  VALID_PASSWORD = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}',
}

export enum ConstantRoles {
  SUPER_USER = 'SUPER_USER',
  TEACHER = 'TEACHER',
  PARENT = 'TEACHER',
}

export enum actionTypes {
  TYPE_REGISTER = 'TYPE_REGISTER',
  TYPE_CHECKOUT = 'TYPE_CHECKOUT',
  TYPE_FORGOT_PASSWORD = 'TYPE_FORGOT_PASSWORD',
  TYPE_CONVERSATION_LOGIN = 'TYPE_CONVERSATION_LOGIN',
}

export enum PaymentStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  IPN_VERIFIED = 'IPN_VERIFIED',
  SUCCESS = 'SUCCESS',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
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

export const notFoundType = {
  noSection: 'noSection',
  deactiveMenu: 'deactiveMenu',
  missingGUID: 'missingGUID',
  temporarilyUnavailable: 'temporarilyUnavailable',
};

export enum checkoutTypes {
  GUEST = 'GUEST',
  NORMAL = 'NORMAL',
  UPDATE = 'UPDATE',
}

export enum paymentMethodTypes {
  CASH = 'CASH',
  ZALO = 'ZALO_PAY',
  MOMO = 'MOMO_PAY',
  EPAY = 'EPAY',
}

export enum displayPaymentMethodTypes {
  NONE = 'NONE',
  CASH = 'CASH',
  MOMO = 'MOMO_PAY',
  CREDIT = 'EPAY.IC',
  ATM = 'EPAY.DC',
  ZALO = 'ZALO_PAY',
}

export enum EPayTypes {
  CREDIT = 'IC',
  ATM = 'DC',
  EPAY = 'NO',
}

export const paymentMethodDisplay = {
  [displayPaymentMethodTypes.CASH]: 'checkout.cash',
  [displayPaymentMethodTypes.ZALO]: 'checkout.zaloPay',
  [displayPaymentMethodTypes.MOMO]: 'checkout.momo',
  [displayPaymentMethodTypes.CREDIT]: 'checkout.creditCard',
  [displayPaymentMethodTypes.ATM]: 'checkout.atmCard',
  [EPayTypes.CREDIT]: 'checkout.creditCard',
  [EPayTypes.ATM]: 'checkout.atmCard',
  [EPayTypes.EPAY]: 'checkout.epay',
};

export enum paymentMethodOptionLabel {
  MOMO_LINK = 'Momo Link',
}

export enum OrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export const OrderStatusSeriated = {
  [OrderStatus.NEW]: 0,
  [OrderStatus.IN_PROGRESS]: 1,
  [OrderStatus.READY]: 2,
  [OrderStatus.DELIVERING]: 3,
  [OrderStatus.COMPLETED]: 4,
};

export const OrderStatusDisplay = {
  [OrderStatus.NEW]: 'trackOrder.new',
  [OrderStatus.IN_PROGRESS]: 'trackOrder.inProgress',
  [OrderStatus.READY]: 'trackOrder.ready',
  [OrderStatus.DELIVERING]: 'trackOrder.delivering',
  [OrderStatus.COMPLETED]: 'trackOrder.delivered',
  [OrderStatus.CANCELLED]: 'trackOrder.cancelled',
  [OrderStatus.REJECTED]: 'trackOrder.rejected',
};

export const OrderStatusDisplayPickup = {
  [OrderStatus.READY]: 'trackOrder.readyForPickup',
  [OrderStatus.COMPLETED]: 'trackOrder.pickedUp',
  [OrderStatus.NEW]: 'trackOrder.new',
  [OrderStatus.IN_PROGRESS]: 'trackOrder.inProgress',
  [OrderStatus.DELIVERING]: 'trackOrder.delivering',
  [OrderStatus.CANCELLED]: 'trackOrder.cancelled',
  [OrderStatus.REJECTED]: 'trackOrder.rejected',
};

export const OrderDeliveryDisplay = {
  [OrderStatus.READY]: 'trackOrder.readyForPickup',
  [OrderStatus.COMPLETED]: 'trackOrder.pickedUp',
};

export enum DeliveryStatus {
  NEW = 'NEW',
  COMPLETED = 'COMPLETED',
}

export { SiteMap };

