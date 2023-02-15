const SiteMap = {
    landing: {
      title: "home.title",
      link: "/",
      isProtected: false,
    },
    home: {
      title: "home.title",
      link: "/CustomerMenu",
      isProtected: false,
    },
    hcs: {
      title: "home.title",
      link: "/HCSMenu",
      isProtected: false,
    },
    ocs: {
      title: "home.title",
      link: "/OCSMenu",
      isProtected: false,
    },
    termsAndConditionsMobile: {
      title: "termsAndConditions.title",
      link: "/mobile/termsconditions",
      isProtected: false,
    },
    privacyPolicyMobile: {
      title: "privacyPolicy.title",
      link: "/mobile/privacypolicy",
      isProtected: false,
    },
    termsAndConditions: {
      title: "termsAndConditions.title",
      link: "/termsconditions",
      isProtected: false,
      onBottomLeftSidebar: true,
    },
    privacyPolicy: {
      title: "privacyPolicy.title",
      link: "/privacypolicy",
      isProtected: false,
      onBottomLeftSidebar: true,
    },
    productDetail: {
      title: "productDetail.title",
      link: "/detail",
      isProtected: false,
    },
    login: {
      title: "login.title",
      link: "/login",
      isProtected: false,
      isHideWhenLoggedIn: true,
      onLeftSidebar: true,
      iconClass: "umni-login"
    },
    logout: {
      title: "logout.title",
      link: "/logout",
      isProtected: true,
      isShowWhenLoggedIn: true,
      onLeftSidebar: true,
      iconClass: "umni-login"
    },
    register: {
      title: "register.title",
      link: "/register",
      isProtected: false,
    },
    setPassword: {
      title: "setPassword.title",
      link: "/setPassword",
      isProtected: false,
    },
    verifyOTPNumber: {
      title: "verifyOTPNumber.title",
      link: "/verifyOTPNumber",
      isProtected: false,
    },
    searchResult: {
      title: "searchResult.title",
      link: "/searchResult",
      isProtected: false,
    },
    previewMenu: {
      title: "previewMenu.title",
      link: "/previewMenu",
      isProtected: false,
    },
    previewDefaultMenu: {
      title: "previeDefaultMenu.title",
      link: "/previewDefault",
      isProtected: false,
    },
    deliveringTo: {
      title: "delivery.title",
      link: "/delivery",
      isProtected: false,
    },
    checkout: {
      title: "checkout.title",
      link: "/checkout",
      isProtected: false,
    },
    checkoutSuccess: {
      title: "checkoutSuccess.title",
      link: "/checkoutSuccess",
      isProtected: false,
    },
    checkoutFailed: {
      title: "checkoutFailed.title",
      link: "/checkoutFailed",
      isProtected: false,
    },
    trackOrder: {
      title: "trackOrder.title",
      link: "/trackOrder",
      iconClass: "umni-contract",
      isProtected: false,
    },
    trackOrderResult: {
      title: "trackOrder.trackOrderResult",
      link: "/trackOrderResult",
      isProtected: false,
    },
    notFound: {
      title: "",
      link: "/NotFound",
      isProtected: false,
    },
    unavailable: {
      title: "",
      link: "/unAvailable",
      isProtected: false,
    },
    forgotPassword: {
      title: "forgotPassword.title",
      link: "/forgotPassword",
      isProtected: false,
    },
    epay: {
      title: "epay.title",
      link: "/epay/callback",
      isProtected: false,
    },
    contact: {
      title: "contact.title",
      link: "/contact",
      isProtected: false,
    },
    orderList: {
      title: "orderList.title",
      link: "/orderList",
      isProtected: true,
      iconClass: "umni-contract"
    },
    adminLogin: {
      title: "admin.login.title",
      link: "/admin/login",
      isProtected: false,
      isHideWhenLoggedIn: true,
      onLeftSidebar: true,
      iconClass: "umni-login"
    },
    adminHome: {
      title: "admin.title",
      link: "/admin/",
      isProtected: true,
      iconClass: "umni-contract"
    },
    adminOutlets: {
      title: "admin.outlets.title",
      link: "/admin/outlets",
      isProtected: true,
      iconClass: "umni-contract"
    },
    adminImport: {
      title: "admin.outlets.title",
      link: "/admin/import",
      isProtected: true,
      iconClass: "umni-contract"
    },
    notAvailableFeatureiOS: {
      title: "",
      link: "/notAvailableFeature",
      isProtected: false,
    },
  }
  

  export default SiteMap;