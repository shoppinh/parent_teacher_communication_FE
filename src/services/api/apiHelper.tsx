import { call } from 'redux-saga/effects';
import { InvitationQuery, LanguageQuery } from 'types/Config';
import {
  ConversationDetailQuery,
  ConversationListQuery,
  ConversationRoomQuery,
  PushNotificationQuery,
} from 'types/Conversation';
import {
  PostDetailTokenQuery,
  PostListByClassQuery,
  PostListTokenQuery,
  PostTokenQuery,
  UpdatePostTokenQuery,
} from 'types/Post';
import { DeviceTokenQuery, RegisterQuery } from 'types/Register';
import { AuthQuery, LogoutQuery, OnlyTokenQuery, RefreshTokenQuery } from 'types/Session';
import { TeacherDetailQuery } from '../../types/Teacher';
import * as api from './index';
import { ClassDetailTokenQuery, ClassListTokenQuery } from '../../types/Class';
import { AddCommentTokenRequest } from '../../types/Comment';
import {
  AddProgressTokenQuery,
  ProgressDetailTokenQuery,
  ProgressListByStudentTokenQuery,
  ProgressListTokenQuery,
  UpdateProgressTokenQuery,
} from '../../types/Progress';
import {
  AddStudentQuery,
  StudentDetailTokenQuery,
  StudentListByClassTokenQuery,
  UpdateStudentQuery,
} from '../../types/Student';
import {
  AssignStudentQuery,
  RemoveStudentQuery,
  TeacherAssignmentDetailTokenQuery,
} from '../../types/TeacherAssignment';

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

export function* apiSendInvitation(query: InvitationQuery) {
  return yield call(api.sendInvitation, query);
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

export function* apiGetUserProfile(query: OnlyTokenQuery) {
  return yield call(api.getUserProfile, query);
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

export function* apiGetSystemSettings() {
  return yield call(api.getSystemSettings);
}

// Admin Helper

export function* apiFetchTeacherDetail(query: TeacherDetailQuery) {
  return yield call(api.fetchTeacherDetail, query);
}

//Post
export function* apiGetPostList(query: PostListTokenQuery) {
  return yield call(api.getPostList, query);
}

export function* apiGetPostListByClass(query: PostListByClassQuery) {
  return yield call(api.getPostListByClass, query);
}

export function* apiAddPost(query: PostTokenQuery) {
  return yield call(api.addPost, query);
}

export function* getPostDetail(query: PostDetailTokenQuery) {
  return yield call(api.getPostDetail, query);
}

export function* apiUpdatePost(query: UpdatePostTokenQuery) {
  return yield call(api.updatePost, query);
}

export function* apiDeletePost(query: PostDetailTokenQuery) {
  return yield call(api.deletePost, query);
}

export function* apiAddPostComment(query: AddCommentTokenRequest) {
  return yield call(api.addPostComment, query);
}
// Class

export function* apiGetClassListByRole(query: ClassListTokenQuery) {
  return yield call(api.getClassListByRole, query);
}

export function* apiGetClassDetail(query: ClassDetailTokenQuery) {
  return yield call(api.getClassDetail, query);
}
// Progress

export function* apiGetProgressListByClass(query: ProgressListTokenQuery) {
  return yield call(api.getProgressListByClass, query);
}
export function* apiGetProgressListByStudent(query: ProgressListByStudentTokenQuery) {
  return yield call(api.getProgressListByStudent, query);
}
export function* apiGetProgressDetail(query: ProgressDetailTokenQuery) {
  return yield call(api.getProgressDetail, query);
}

export function* apiRemoveProgress(query: ProgressDetailTokenQuery) {
  return yield call(api.removeProgress, query);
}

export function* apiUpdateProgress(query: UpdateProgressTokenQuery) {
  return yield call(api.updateProgress, query);
}

export function* apiAddProgress(query: AddProgressTokenQuery) {
  return yield call(api.addProgress, query);
}
// Student

export function* apiGetStudentListByClass(query: StudentListByClassTokenQuery) {
  return yield call(api.getStudentListByClass, query);
}

export function* apGetStudentListByParent(query: OnlyTokenQuery) {
  return yield call(api.getStudentListByParent, query);
}

export function* apiUpdateStudent(query: UpdateStudentQuery) {
  return yield call(api.updateStudent, query);
}

export function* apiAddStudent(query: AddStudentQuery) {
  return yield call(api.addStudent, query);
}

export function* apiRemoveStudent(query: StudentDetailTokenQuery) {
  return yield call(api.removeStudent, query);
}
// Teacher

export function* apiGetTeacherAssignmentByClassAndTeacher(
  query: TeacherAssignmentDetailTokenQuery
) {
  return yield call(api.getTeacherAssignmentByClassAndTeacher, query);
}

export function* apiAssignStudent(query: AssignStudentQuery) {
  return yield call(api.assignStudent, query);
}

export function* apiRemoveStudentFromClass(query: RemoveStudentQuery) {
  return yield call(api.removeStudentFromClass, query);
}
