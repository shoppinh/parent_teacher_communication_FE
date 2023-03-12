export { login, logout, getUserInfo, refreshToken } from './authentication';
export { register, registerDeviceToken } from './register';
export { getPlatformSetting, updateLanguage } from './config';
export { getClassListByRole } from './class';
export {
  getConversationDetail,
  getCountUnreadRoom,
  sendPushNotification,
  getConversationListOfUser,
} from './conversation';
export { fetchTeacherDetail } from './admin';

export {
  getPostList,
  getPostListByClass,
  addPost,
  getPostDetail,
  updatePost,
  deletePost,
  addPostComment
} from './post';
