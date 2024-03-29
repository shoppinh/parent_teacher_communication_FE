import { call } from 'redux-saga/effects';
import { CreateTeacherQuery, TeacherDetailQuery, UpdateTeacherQuery } from 'types/Admin/Teacher';
import { ListWithPaginationQuery } from 'types/Common';
import { InvitationQuery, LanguageQuery } from 'types/Config';
import {
  ConversationDetailQuery,
  ConversationListQuery,
  ConversationRoomQuery,
  PushNotificationQuery,
} from 'types/Conversation';
import { AddEventQuery, EventDetailQuery, EventListQuery } from 'types/Event';
import {
  CreateParentQuery,
  ParentDetailQuery,
  ParentPayload,
  UpdateParentQuery,
} from 'types/Parent';
import {
  PostDetailTokenQuery,
  PostListByClassQuery,
  PostListTokenQuery,
  PostTokenQuery,
  UpdatePostTokenQuery,
} from 'types/Post';
import { DeviceTokenQuery } from 'types/Register';
import {
  AuthQuery,
  LogoutQuery,
  OnlyTokenQuery,
  RefreshTokenQuery,
  UpdateUserQuery,
} from 'types/Session';
import { CreateSubjectQuery, SubjectDetailQuery, UpdateSubjectQuery } from 'types/Subject';
import {
  ClassDetailTokenQuery,
  ClassListTokenQuery,
  CreateClassQuery,
  UpdateClassQuery,
} from '../../types/Class';
import { AddCommentTokenRequest } from '../../types/Comment';
import {
  AddProgressTokenQuery,
  ProgressDetailTokenQuery,
  ProgressExportTokenQuery,
  ProgressListByStudentTokenQuery,
  ProgressListTokenQuery,
  UpdateProgressTokenQuery,
} from '../../types/Progress';
import {
  AddLeaveFormQuery,
  AddStudentQuery,
  StudentDetailTokenQuery,
  StudentLeaveFormListQuery,
  StudentListByClassTokenQuery,
  UpdateLeaveFormQuery,
  UpdateLeaveFormStatusQuery,
  UpdateStudentQuery,
} from '../../types/Student';
import {
  AssignOrRemoveStudentQuery,
  CreateTeacherAssignmentQuery,
  TeacherAssignmentDetailQuery,
  TeacherAssignmentDetailTokenQuery,
  UpdateTeacherAssignmentQuery,
} from '../../types/TeacherAssignment';
import * as api from './index';

export function* apiLogin(query: AuthQuery) {
  return yield call(api.login, query);
}

export function* apiLogout(query: LogoutQuery) {
  return yield call(api.logout, query);
}

export function* apiRefreshToken(query: RefreshTokenQuery) {
  return yield call(api.refreshToken, query);
}

export function* apiSendInvitation(query: InvitationQuery) {
  return yield call(api.sendInvitation, query);
}

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

export function* apiUpdateUserInfo(query: UpdateUserQuery) {
  return yield call(api.updateUserInfo, query);
}

export function* apiRegister(query: ParentPayload) {
  return yield call(api.register, query);
}

// Admin Helper

export function* apiFetchTeacherDetail(query: TeacherDetailQuery) {
  return yield call(api.fetchTeacherDetail, query);
}

export function* apiGetParentList(query: ListWithPaginationQuery) {
  return yield call(api.getParentList, query);
}

export function* apiCreateParent(query: CreateParentQuery) {
  return yield call(api.createParent, query);
}

export function* apiUpdateParent(query: UpdateParentQuery) {
  return yield call(api.updateParent, query);
}

export function* apiRemoveParent(query: ParentDetailQuery) {
  return yield call(api.removeParent, query);
}

export function* apiGetTeacherList(query: ListWithPaginationQuery) {
  return yield call(api.getTeacherList, query);
}

export function* apiCreateTeacher(query: CreateTeacherQuery) {
  return yield call(api.createTeacher, query);
}

export function* apiUpdateTeacher(query: UpdateTeacherQuery) {
  return yield call(api.updateTeacher, query);
}

export function* apiRemoveTeacher(query: TeacherDetailQuery) {
  return yield call(api.removeTeacher, query);
}

export function* apiRemoveStudent(query: StudentDetailTokenQuery) {
  return yield call(api.removeStudent, query);
}

export function* apiGetStudentList(query: ListWithPaginationQuery) {
  return yield call(api.getStudentList, query);
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

export function* apiGetTeacherAssignmentList(query: ListWithPaginationQuery) {
  return yield call(api.getTeacherAssignmentList, query);
}

export function* apiCreateTeacherAssignment(query: CreateTeacherAssignmentQuery) {
  return yield call(api.createTeacherAssignment, query);
}

export function* apiUpdateTeacherAssignment(query: UpdateTeacherAssignmentQuery) {
  return yield call(api.updateTeacherAssignment, query);
}

export function* apiRemoveTeacherAssignment(query: TeacherAssignmentDetailQuery) {
  return yield call(api.removeTeacherAssignment, query);
}

export function* apiGetSubjectList(query: ListWithPaginationQuery) {
  return yield call(api.getSubjectList, query);
}

export function* apiCreateSubject(query: CreateSubjectQuery) {
  return yield call(api.createSubject, query);
}

export function* apiUpdateSubject(query: UpdateSubjectQuery) {
  return yield call(api.updateSubject, query);
}

export function* apiRemoveSubject(query: SubjectDetailQuery) {
  return yield call(api.removeSubject, query);
}
// Class

export function* apiGetClassListByRole(query: ClassListTokenQuery) {
  return yield call(api.getClassListByRole, query);
}

export function* apiGetClassDetail(query: ClassDetailTokenQuery) {
  return yield call(api.getClassDetail, query);
}

export function* apiUpdateLeaveFormStatus(query: UpdateLeaveFormStatusQuery) {
  return yield call(api.updateLeaveFormStatus, query);
}

export function* apiAddClass(query: CreateClassQuery) {
  return yield call(api.addClass, query);
}

export function* apiUpdateClass(query: UpdateClassQuery) {
  return yield call(api.updateClass, query);
}

export function* apiRemoveClass(query: ClassDetailTokenQuery) {
  return yield call(api.removeClass, query);
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

export function* apiExportReportCard(query: ProgressExportTokenQuery) {
  return yield call(api.exportReportCard, query);
}

// Student

export function* apiGetStudentListByClass(query: StudentListByClassTokenQuery) {
  return yield call(api.getStudentListByClass, query);
}

export function* apiGetUnassignedStudentList(query: OnlyTokenQuery) {
  return yield call(api.getUnassignedStudentList, query);
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

export function* apiRemoveStudentFromParent(query: StudentDetailTokenQuery) {
  return yield call(api.removeStudentFromParent, query);
}

// Teacher

export function* apiGetTeacherAssignmentByClassAndTeacher(
  query: TeacherAssignmentDetailTokenQuery
) {
  return yield call(api.getTeacherAssignmentByClassAndTeacher, query);
}

export function* apiAssignStudent(query: AssignOrRemoveStudentQuery) {
  return yield call(api.assignStudent, query);
}

export function* apiRemoveStudentFromClass(query: AssignOrRemoveStudentQuery) {
  return yield call(api.removeStudentFromClass, query);
}

//Event

export function* apiGetEventList(query: EventListQuery) {
  return yield call(api.getEventList, query);
}
export function* apiAddEvent(query: AddEventQuery) {
  return yield call(api.createEvent, query);
}
export function* apiRemoveEvent(query: EventDetailQuery) {
  return yield call(api.removeEvent, query);
}

// Parent

export function* apiGetStudentLeaveFormList(query: StudentLeaveFormListQuery) {
  return yield call(api.getStudentLeaveFormList, query);
}

export function* apiSubmitLeaveForm(query: AddLeaveFormQuery) {
  return yield call(api.submitLeaveForm, query);
}

export function* apiUpdateLeaveForm(query: UpdateLeaveFormQuery) {
  return yield call(api.updateLeaveForm, query);
}
