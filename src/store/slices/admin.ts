import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
// import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { AdminBasicQuery, AdminConfig, AdminError, AdminState } from 'types/Admin';
import { adminSaga } from 'store/sagas/adminSaga';
import {
  CreateTeacherQuery,
  Teacher,
  TeacherDetailQuery,
  TeacherListQuery,
  UpdateTeacherQuery,
} from 'types/Admin/Teacher';
import {
  CreateParentQuery,
  Parent,
  ParentDetailQuery,
  ParentListQuery,
  UpdateParentQuery,
} from 'types/Parent';
import { loadState } from 'store/localStorage';

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
    loadTeacherList(state, action: PayloadAction<TeacherListQuery>) {},
    loadTeacherListSuccess(state, action: PayloadAction<Teacher[]>) {},
    createTeacher(state, action: PayloadAction<CreateTeacherQuery>) {},
    createTeacherSuccess(state, action: PayloadAction<Teacher>) {},
    updateTeacher(state, action: PayloadAction<UpdateTeacherQuery>) {},
    updateTeacherSuccess(state, action: PayloadAction<Teacher>) {},
    removeTeacher(state, action: PayloadAction<TeacherDetailQuery>) {},
    removeTeacherSuccess(state, action: PayloadAction<{ teacherId: string }>) {},
    // Parent section
    loadParentList(state, action: PayloadAction<ParentListQuery>) {
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
    // Assignment section
    // Subject section
    Error(state, action: PayloadAction<AdminError>) {
      state.error = action.payload;
      state.loading = false;
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
