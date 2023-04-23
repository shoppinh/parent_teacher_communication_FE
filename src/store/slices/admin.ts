import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
// import { loadState } from 'store/localStorage';
import { loadState } from 'store/localStorage';
import { adminSaga } from 'store/sagas/adminSaga';
import { AdminBasicQuery, AdminConfig, AdminError, AdminState } from 'types/Admin';
import {
  CreateTeacherQuery,
  Teacher,
  TeacherDetailQuery,
  UpdateTeacherQuery,
} from 'types/Admin/Teacher';
import { ListWithPaginationQuery } from 'types/Common';
import { CreateParentQuery, Parent, ParentDetailQuery, UpdateParentQuery } from 'types/Parent';
import { CreateSubjectQuery, Subject, SubjectDetailQuery, UpdateSubjectQuery } from 'types/Subject';
import {
  CreateTeacherAssignmentQuery,
  TeacherAssignment,
  TeacherAssignmentDetailQuery,
  UpdateTeacherAssignmentQuery,
} from 'types/TeacherAssignment';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  AddStudentQuery,
  Student,
  StudentDetailTokenQuery,
  UpdateStudentQuery,
} from 'types/Student';

// import { MenuPayLoad } from 'types/Menu';

const adminCache = loadState()?.admin;

export const initialState: AdminState = {
  error: null,
  data: {
    ...adminCache?.data,
  },
  loading: false,
  actionLoading: false,
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getAllThirdParty(state, action: PayloadAction<AdminBasicQuery>) {
      state.error = null;
    },
    updateConfigThirdParty(state, action: PayloadAction<AdminConfig>) {
      state.data.config = {
        ...state.data.config,
        ...action.payload,
      };
      state.error = null;
    },
    // Teacher section
    loadTeacherList(state, action: PayloadAction<ListWithPaginationQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadTeacherListSuccess(state, action: PayloadAction<{ data: Teacher[]; totalItem: number }>) {
      state.data = {
        ...state.data,
        teacher: {
          ...state.data.teacher,
          teacherList: {
            ...state.data.teacher?.teacherList,
            data: action.payload.data,
            totalItem: action.payload.totalItem,
          },
        },
      };
      state.loading = false;
      state.error = null;
    },
    createTeacher(state, action: PayloadAction<CreateTeacherQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    createTeacherSuccess(state, action: PayloadAction<Teacher>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        teacher: {
          ...state.data.teacher,
          teacherList: {
            ...state.data.teacher?.teacherList,
            data: [...(state.data.teacher?.teacherList?.data || []), action.payload],
            totalItem: (state.data.teacher?.teacherList?.totalItem || 0) + 1,
          },
        },
      };
    },
    updateTeacher(state, action: PayloadAction<UpdateTeacherQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    updateTeacherSuccess(state, action: PayloadAction<Teacher>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        teacher: {
          ...state.data.teacher,
          teacherList: {
            ...state.data.teacher?.teacherList,
            data: state.data.teacher?.teacherList?.data?.map((item) =>
              item._id === action.payload._id ? action.payload : item
            ),
          },
        },
      };
    },
    removeTeacher(state, action: PayloadAction<TeacherDetailQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    removeTeacherSuccess(state, action: PayloadAction<{ teacherId: string }>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        teacher: {
          ...state.data.teacher,
          teacherList: {
            ...state.data.teacher?.teacherList,
            data: state.data.teacher?.teacherList?.data?.filter(
              (item) => item._id !== action.payload.teacherId
            ),
            totalItem: (state.data.teacher?.teacherList?.totalItem || 0) - 1,
          },
        },
      };
    },
    // Parent section
    loadParentList(state, action: PayloadAction<ListWithPaginationQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadParentListSuccess(state, action: PayloadAction<{ data: Parent[]; totalItem: number }>) {
      state.data = {
        ...state.data,
        parent: {
          ...state.data.parent,
          parentList: {
            ...state.data.parent?.parentList,
            data: action.payload.data,
            totalItem: action.payload.totalItem,
          },
        },
      };
      state.loading = false;
      state.error = null;
    },
    createParent(state, action: PayloadAction<CreateParentQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    createParentSuccess(state, action: PayloadAction<Parent>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        parent: {
          ...state.data.parent,
          parentList: {
            ...state.data.parent?.parentList,
            data: [...(state.data.parent?.parentList?.data || []), action.payload],
            totalItem: (state.data.parent?.parentList?.totalItem || 0) + 1,
          },
        },
      };
    },
    updateParent(state, action: PayloadAction<UpdateParentQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    updateParentSuccess(state, action: PayloadAction<Parent>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        parent: {
          ...state.data.parent,
          parentList: {
            ...state.data.parent?.parentList,
            data: state.data.parent?.parentList?.data?.map((parent) =>
              parent._id === action.payload._id ? action.payload : parent
            ),
            totalItem: state.data.parent?.parentList?.totalItem,
          },
        },
      };
    },
    removeParent(state, action: PayloadAction<ParentDetailQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    removeParentSuccess(state, action: PayloadAction<{ parentId: string }>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        parent: {
          ...state.data.parent,
          parentList: {
            ...state.data.parent?.parentList,
            data: state.data.parent?.parentList?.data?.filter(
              (parent) => parent._id !== action.payload.parentId
            ),
            totalItem: (state.data.parent?.parentList?.totalItem || 0) - 1,
          },
        },
      };
    },
    // Student section
    loadStudentList(state, action: PayloadAction<ListWithPaginationQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadStudentListSuccess(state, action: PayloadAction<{ data: Student[]; totalItem: number }>) {
      state.data = {
        ...state.data,
        student: {
          ...state.data?.student,
          studentList: {
            ...state.data.student?.studentList,
            data: action.payload.data,
            totalItem: action.payload.totalItem,
          },
        },
      };
      state.loading = false;
      state.error = null;
    },
    createStudent(state, action: PayloadAction<AddStudentQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    createStudentSuccess(state, action: PayloadAction<Student>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        student: {
          ...state.data.student,
          studentList: {
            ...state.data.student?.studentList,
            data: [...(state.data.student?.studentList?.data || []), action.payload],
            totalItem: (state.data.student?.studentList?.totalItem || 0) + 1,
          },
        },
      };
    },
    updateStudent(state, action: PayloadAction<UpdateStudentQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    updateStudentSuccess(state, action: PayloadAction<Student>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        student: {
          ...state.data.student,
          studentList: {
            ...state.data.student?.studentList,
            data: state.data.student?.studentList?.data?.map((student) =>
              student._id === action.payload._id ? action.payload : student
            ),
            totalItem: state.data.student?.studentList?.totalItem,
          },
        },
      };
    },
    removeStudent(state, action: PayloadAction<StudentDetailTokenQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    removeStudentSuccess(state, action: PayloadAction<{ studentId: string }>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        student: {
          ...state.data.student,
          studentList: {
            ...state.data.student?.studentList,
            data: state.data.student?.studentList?.data?.filter(
              (student) => student._id !== action.payload.studentId
            ),
            totalItem: (state.data.student?.studentList?.totalItem || 0) - 1,
          },
        },
      };
    },
    // Assignment section
    loadAssignmentList(state, action: PayloadAction<ListWithPaginationQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadAssignmentListSuccess(
      state,
      action: PayloadAction<{ data: TeacherAssignment[]; totalItem: number }>
    ) {
      state.data = {
        ...state.data,
        teacherAssignment: {
          ...state.data.teacherAssignment,
          teacherAssignmentList: {
            ...state.data.teacherAssignment?.teacherAssignmentList,
            data: action.payload.data,
            totalItem: action.payload.totalItem,
          },
        },
      };
      state.loading = false;
      state.error = null;
    },
    createAssignment(state, action: PayloadAction<CreateTeacherAssignmentQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    createAssignmentSuccess(state, action: PayloadAction<TeacherAssignment>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        teacherAssignment: {
          ...state.data.teacherAssignment,
          teacherAssignmentList: {
            ...state.data.teacherAssignment?.teacherAssignmentList,
            data: [
              ...(state.data.teacherAssignment?.teacherAssignmentList?.data || []),
              action.payload,
            ],
            totalItem: (state.data.teacherAssignment?.teacherAssignmentList?.totalItem || 0) + 1,
          },
        },
      };
    },
    updateAssignment(state, action: PayloadAction<UpdateTeacherAssignmentQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    updateAssignmentSuccess(state, action: PayloadAction<TeacherAssignment>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        teacherAssignment: {
          ...state.data.teacherAssignment,
          teacherAssignmentList: {
            ...state.data.teacherAssignment?.teacherAssignmentList,
            data: state.data.teacherAssignment?.teacherAssignmentList?.data?.map((assignment) =>
              assignment._id === action.payload._id ? action.payload : assignment
            ),
            totalItem: state.data.teacherAssignment?.teacherAssignmentList?.totalItem,
          },
        },
      };
    },
    removeAssignment(state, action: PayloadAction<TeacherAssignmentDetailQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    removeAssignmentSuccess(state, action: PayloadAction<{ assignmentId: string }>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        teacherAssignment: {
          ...state.data.teacherAssignment,
          teacherAssignmentList: {
            ...state.data.teacherAssignment?.teacherAssignmentList,
            data: state.data.teacherAssignment?.teacherAssignmentList?.data?.filter(
              (assignment) => assignment._id !== action.payload.assignmentId
            ),
            totalItem: (state.data.teacherAssignment?.teacherAssignmentList?.totalItem || 0) - 1,
          },
        },
      };
    },
    // Subject section
    loadSubjectList(state, action: PayloadAction<ListWithPaginationQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadSubjectListSuccess(state, action: PayloadAction<{ data: Subject[]; totalItem: number }>) {
      state.data = {
        ...state.data,
        subject: {
          ...state.data.subject,
          subjectList: {
            ...state.data.subject?.subjectList,
            data: action.payload.data,
            totalItem: action.payload.totalItem,
          },
        },
      };
      state.loading = false;
      state.error = null;
    },
    createSubject(state, action: PayloadAction<CreateSubjectQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    createSubjectSuccess(state, action: PayloadAction<Subject>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        subject: {
          ...state.data.subject,
          subjectList: {
            ...state.data.subject?.subjectList,
            data: [...(state.data.subject?.subjectList?.data || []), action.payload],
            totalItem: (state.data.subject?.subjectList?.totalItem || 0) + 1,
          },
        },
      };
    },
    updateSubject(state, action: PayloadAction<UpdateSubjectQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    updateSubjectSuccess(state, action: PayloadAction<Subject>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        subject: {
          ...state.data.subject,
          subjectList: {
            ...state.data.subject?.subjectList,
            data: state.data.subject?.subjectList?.data?.map((subject) =>
              subject._id === action.payload._id ? action.payload : subject
            ),
            totalItem: state.data.subject?.subjectList?.totalItem,
          },
        },
      };
    },
    removeSubject(state, action: PayloadAction<SubjectDetailQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    removeSubjectSuccess(state, action: PayloadAction<{ subjectId: string }>) {
      state.actionLoading = false;
      state.error = null;
      state.data = {
        ...state.data,
        subject: {
          ...state.data.subject,
          subjectList: {
            ...state.data.subject?.subjectList,
            data: state.data.subject?.subjectList?.data?.filter(
              (subject) => subject._id !== action.payload.subjectId
            ),
            totalItem: (state.data.subject?.subjectList?.totalItem || 0) - 1,
          },
        },
      };
    },
    Error(state, action: PayloadAction<AdminError>) {
      state.error = action.payload;
      state.loading = false;
      state.actionLoading = false;
    },
  },
});

export const { name, actions: adminActions, reducer } = slice;

export const useAdminSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: adminSaga });

  return {
    actions: adminActions,
  };
};
