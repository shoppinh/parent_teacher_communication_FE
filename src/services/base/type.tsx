export enum AcceptType {
  json = 'application/json',
  formData = 'multipart/form-data',
  urlEncode = 'application/x-www-form-urlencoded',
}

export enum GrantType {
  REFRESH_TOKEN = 'refresh_token',
  PASSWORD = 'password',
}

export const APIs = {
  consumer: {
    outletGetInfo: '/api/consumers/outlet/getInfo',
    menuData: '/api/consumers/menu/data',
    menuProducts: '/api/consumers/menu/products',
    menuSearch: '/api/consumers/menu/search',
    menuSearchSuggestion: '/api/consumers/menu/searchSuggestion',
    giftPromotions: 'api/consumers/menus/{menuGUID}/gift-promotions',
    login: '/api/consumers/login',
    logout: '/api/consumers/logout',
    refreshToken: 'api/consumers/refreshToken',
    registerInfo: '/api/consumers/register/info',
    registerVerifyCode: 'api/consumers/register/verifyCode',
    registerSetPassword: '/api/consumers/register/setPassword',
    registerReSendCode: 'api/consumers/register/resendCode',
    info: '/api/consumers/',
    latestAddress: '/api/consumers/{mobilePhone}/latestAddress',
    menuRecommendation: '/api/consumers/menu/recommendation',
    productRecommendation: '/api/consumers/product/recommendation',
    platformSetting: '/api/consumers/platform/setting',
    forgetPassword: '/api/consumers/forgetPassword',
    forgetVerifyCode: '/api/consumers/forgetVerifyCode',
    forgetSetPassword: '/api/consumers/forgetSetPassword',
    orders: '/api/consumers/orders',
    ordersMenu: '/api/consumers/orders/{menuGUID}',
    orderTrack: '/api/consumers/order/track',
    orderCancel: '/api/consumers/order/cancel/{orderId}',
    trackLocation: '/api/consumers/track/location/',
    registerDeviceToken: 'api/consumers/consumer/device/register',
    languageUpdate: 'api/consumers/language/update',
  },
  admin: {
    login: '/api/user/login',
    refreshToken: '/api/user/refreshToken',
    uploadExcelMenuFile: '/files/importing-menu/upload/excel-file',
    uploadImageMenuFile: '/files/importing-menu/upload/image-file',
    menuImport: '/api/admin/menu/import',
    outlet: {
      getList: '/api/admin/outlet/getList',
      getMenuByOutlet: '/api/admin/outlet/{outletId}/menus',
      detail: '/api/admin/outlet/{outletId}',
    },
    getAllThirdParty: '/api/admin/get-all-third-party',
    getExportDataMenu: '/api/admin/export/data-menu',
    activeOutlet: '/api/admin/active-outlet',
    deactivateOutlet: '/api/admin/deactivate-outlet',
    thirdPartyInformation: '/api/admin/third-party-information',
    enableProductNotes: '/api/admin/menu/menu-noted/status',
    sendZNSActive: '/api/admin/outlet/send-zns-active',
  },
  outlet: {
    configs: '/api/outlet/configs',
    configsDistricts: '/api/outlet/config/districts',
    configsWards: '/api/outlet/config/wards',
  },
  order: {
    consumerPlaceOrder: '/api/order/consumer/placeOrder',
    consumerValidationCheckout: '/api/order/consumer/validation-checkout',
    ePayCallbackToServer: '/api/order/ePayCallback',
    ePayPaymentFailed: '/api/order/ePayPaymentFailed',
    deliveryZeekEstimates: '/api/order/delivery/zeek/takeaway-estimates/{outletId}',
    verifyCoupon: '/api/order/verify-coupon',
  },
  defaultMenu: {
    index: '/api/defaultMenu',
  },
  message: {
    getConversationList: '/api/message/get-conversation/{mobilePhone}/{roleId}',
    getConversationDetail: '/api/message/get-conversation/detail/{roomId}',
    getConversationUnreadUser: '/api/message/count/unread/user/{mobilePhone}/{roleId}',
    getConversationUnreadRoom:
      '/api/message/count/unread/room/{fromMobilePhone}/{fromRoleId}/{toMobilePhone}/{toRoleId}',
  },
  social: {
    register: '/api/consumers/social/register',
  },
};
