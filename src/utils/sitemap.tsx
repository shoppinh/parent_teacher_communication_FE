const SiteMap = {
  landing: {
    title: 'home.title',
    link: '/',
    isProtected: false,
  },
  teacherHome: {
    title: 'teacher.home.title',
    link: '/teacher',
    isProtected: true,
  },
  teacherEvent: {
    title: 'teacher.event.title',
    link: '/teacher-event',
    isProtected: true,
  },
  teacherManagement: {
    title: 'teacher.management.title',
    link: '/teacher-management',
    isProtected: true,
  },
  parentHome: {
    title: 'parent.home.title',
    link: '/parent',
    isProtected: true,
  },
  parentEvent: {
    title: 'parent.event.title',
    link: '/parent-event',
    isProtected: true,
  },
  parentManagement: {
    title: 'parent.management.title',
    link: '/parent-management',
    isProtected: true,
  },
  adminHome: {
    title: 'admin.home.title',
    link: '/admin',
    isProtected: true,
  },
  termsAndConditionsMobile: {
    title: 'termsAndConditions.title',
    link: '/mobile/termsconditions',
    isProtected: false,
  },
  privacyPolicyMobile: {
    title: 'privacyPolicy.title',
    link: '/mobile/privacypolicy',
    isProtected: false,
  },
  termsAndConditions: {
    title: 'termsAndConditions.title',
    link: '/termsconditions',
    isProtected: false,
    onBottomLeftSidebar: true,
  },
  privacyPolicy: {
    title: 'privacyPolicy.title',
    link: '/privacypolicy',
    isProtected: false,
    onBottomLeftSidebar: true,
  },
  login: {
    title: 'login.title',
    link: '/login',
    isProtected: false,
    isHideWhenLoggedIn: true,
    onLeftSidebar: true,
    iconClass: 'umni-login',
  },
  adminLogin: {
    title: 'admin.login.title',
    link: '/admin/login',
    isProtected: false,
    isHideWhenLoggedIn: true,
    onLeftSidebar: true,
    iconClass: 'umni-login',
  },
  logout: {
    title: 'logout.title',
    link: '/logout',
    isProtected: true,
    isShowWhenLoggedIn: true,
    onLeftSidebar: true,
    iconClass: 'umni-login',
  },
  register: {
    title: 'register.title',
    link: '/register',
    isProtected: false,
  },
  setPassword: {
    title: 'setPassword.title',
    link: '/setPassword',
    isProtected: false,
  },
  // verifyOTPNumber: {
  //   title: "verifyOTPNumber.title",
  //   link: "/verifyOTPNumber",
  //   isProtected: false,
  // },
  notFound: {
    title: '',
    link: '/NotFound',
    isProtected: false,
  },
  unavailable: {
    title: '',
    link: '/unAvailable',
    isProtected: false,
  },
  // forgotPassword: {
  //   title: "forgotPassword.title",
  //   link: "/forgotPassword",
  //   isProtected: false,
  // },

  notAvailableFeatureiOS: {
    title: '',
    link: '/notAvailableFeature',
    isProtected: false,
  },
};

export default SiteMap;
