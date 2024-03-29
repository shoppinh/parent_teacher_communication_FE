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
  user: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refreshToken: '/api/auth/refresh-token',
    info: 'api/user/profile/',
    registerInfo: '/api/auth/register',
    registerDeviceToken: 'api/auth/device-token',
    platformSetting: '/api/user/platform/setting',
    languageUpdate: 'api/user/language/update',
    sendInvitation: 'api/user/send-invitation',
    uploadFile: 'api/file/upload',

    // registerVerifyCode: 'api/user/register/verifyCode',
    // registerSetPassword: '/api/user/register/setPassword',
    // registerReSendCode: 'api/user/register/resendCode',
    // forgetPassword: '/api/user/forgetPassword',
    // forgetVerifyCode: '/api/user/forgetVerifyCode',
    // forgetSetPassword: '/api/user/forgetSetPassword',
  },
  admin: {
    addRole: '/api/admin/add-roles',
    user: {
      getAllUser: '/api/admin/user/list',
      getUserDetail: '/api/admin/user/{userId}',
      addUser: '/api/admin/user',
      updateUser: '/api/admin/user/{userId}',
      deleteUser: '/api/admin/user/{userId}',
    },
    parent: {
      addParent: '/api/admin/parent',
      updateParent: '/api/admin/parent/{parentId}',
      deleteParent: '/api/admin/parent/{parentId}',
      getParentDetail: '/api/admin/parent/{parentId}',
      getAllParent: '/api/admin/parent/list',
    },
    student: {
      addStudent: '/api/admin/student',
      updateStudent: '/api/admin/student/{studentId}',
      deleteStudent: '/api/admin/student/{studentId}',
      getStudentDetail: '/api/admin/student/{studentId}',
      getAllStudent: '/api/admin/student/list',
    },
    teacher: {
      addTeacher: '/api/admin/teacher',
      updateTeacher: '/api/admin/teacher/{teacherId}',
      deleteTeacher: '/api/admin/teacher/{teacherId}',
      getTeacherDetail: '/api/admin/teacher/{teacherId}',
      getAllTeacher: '/api/admin/teacher/list',
    },
    subject: {
      addSubject: '/api/admin/subject',
      updateSubject: '/api/admin/subject/{subjectId}',
      deleteSubject: '/api/admin/subject/{subjectId}',
      getSubjectDetail: '/api/admin/subject/{subjectId}',
      getAllSubject: '/api/admin/subject/list',
    },
    class: {
      addClass: '/api/admin/class',
      updateClass: '/api/admin/class/{classId}',
      deleteClass: '/api/admin/class/{classId}',
      getClassDetail: '/api/admin/class/{classId}',
      getAllClass: '/api/admin/class/list',
    },
    teacherAssignment: {
      addTeacherAssignment: '/api/admin/teacher-assignment',
      updateTeacherAssignment: '/api/admin/teacher-assignment/{teacherAssignmentId}',
      deleteTeacherAssignment: '/api/admin/teacher-assignment/{teacherAssignmentId}',
      getTeacherAssignmentDetail: '/api/admin/teacher-assignment/{teacherAssignmentId}',
      getAllTeacherAssignment: '/api/admin/teacher-assignment/list',
    },
  },
  post: {
    addPost: '/api/post/add-post',
    getAllPost: '/api/post/list',
    getPostDetail: '/api/post/{postId}',
    updatePost: '/api/post/{postId}',
    deletePost: '/api/post/{postId}',
    getPostListByClass: '/api/post/class-post-list/{classId}',
  },
  comment: {
    addComment: '/api/comment/add-comment',
  },
  class: {
    getClassListByRole: '/api/class/list-by-role',
    getClassDetail: '/api/class/{classId}',
  },
  teacher: {
    profile: '/api/teacher/profile',
    progress: {
      getProgressListByClass: '/api/teacher/progress-tracking-list-by-class/{classId}',
      addProgress: '/api/teacher/progress-tracking',
      updateProgress: '/api/teacher/progress-tracking/{progressId}',
      removeProgress: '/api/teacher/progress-tracking/{progressId}',
    },
    leaveForm: {
      updateLeaveForm: '/api/teacher/leave-form/{formId}',
    },
    assignStudent: '/api/teacher/assign-student',
    removeStudent: '/api/teacher/remove-student',
    teacherAssignment: {
      getTeacherAssignmentByClassAndTeacher: '/api/teacher/teacher-assignment-detail/{classId}',
    },
    updateLeaveFormStatus: '/api/teacher/leave-form/{leaveFormId}',
  },

  student: {
    progress: {
      getProgressDetail: '/api/student/progress-tracking/{progressId}', //Parent and teacher use this
      getProgressListByStudent: '/api/student/progress-tracking-list-by-student/{studentId}', // Parent use this
      exportReportCard: '/api/student/progress-tracking/export-report-card/{studentId}', // Parent use this
    },
    leaveForm: {
      getLeaveFormListByClass: '/api/student/leave-form-list-by-class/{classId}', // Teacher uses this
      getLeaveFormDetail: '/api/student/leave-form/{leaveFormId}', //Parent and teacher use this
      getLeaveFormListByStudent: '/api/student/leave-form-list-by-student/{studentId}', // Parent uses this
    },
    getStudentDetail: '/api/student/{studentId}', // Teacher and parent can access
    getAllStudent: '/api/student/list', // Parent uses this to get all child
    getAllStudentByParent: '/api/student/list-by-parent/{parentId}', // Teacher uses this
    getAllStudentByClass: '/api/student/list-by-class/{classId}', // Parent and teacher  uses this
    getUnassignedStudentList: '/api/student/unassigned-student-list', // Teacher uses this
  },
  parent: {
    leaveForm: {
      submitLeaveForm: '/api/parent/leave-form',
      updateLeaveForm: '/api/parent/leave-form/{formId}',
    },
  },
  message: {
    getConversationList: '/api/message/get-conversation/{mobilePhone}/{roleId}',
    getConversationDetail: '/api/message/get-conversation/detail/{roomId}',
    getConversationUnreadUser: '/api/message/count/unread/user/{mobilePhone}/{roleId}',
    getConversationUnreadRoom:
      '/api/message/count/unread/room/{fromMobilePhone}/{fromRoleId}/{toMobilePhone}/{toRoleId}',
    sendPushNotification: '/api/push-notification/send-push-notification',
  },
  settings: {
    getSettings: '/api/settings/get-settings',
  },
  event: {
    getEventList: '/api/event/list',
    getEventDetail: '/api/event/{eventId}',
    addEvent: '/api/event',
    updateEvent: '/api/event/{eventId}',
    deleteEvent: '/api/event/{eventId}',
  },
};
