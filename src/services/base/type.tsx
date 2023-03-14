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
    registerInfo: '/api/user/register/info',
    registerDeviceToken: 'api/auth/device-token',
    platformSetting: '/api/user/platform/setting',
    languageUpdate: 'api/user/language/update',

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
};
