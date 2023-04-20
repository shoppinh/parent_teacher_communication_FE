import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { UpdateLeaveFormStatusPayload, UpdateLeaveFormStatusQuery } from 'types/Student';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  Class,
  ClassDetailTokenQuery,
  ClassError,
  ClassListTokenQuery,
  ClassState,
  CreateClassQuery,
  RemoveClassQuery,
} from '../../types/Class';
import { classSaga } from '../sagas/classSaga';
const classCache = loadState()?.class;

export const initialState: ClassState = {
  data: { ...classCache?.data },
  error: null,
  loading: false,
  actionLoading: false,
};

const slice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    loadClassList(state, action: PayloadAction<ClassListTokenQuery>) {
      state.loading = true;
      state.error = null;
    },

    loadClassListSuccess(state, action) {
      state.data.classes = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeClass(state, action: PayloadAction<RemoveClassQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    removeClassSuccess(state, action: PayloadAction<string>) {
      state.data.classes = {
        ...state.data.classes,
        data: state.data.classes.data.filter((item) => item._id !== action.payload),
        total: state.data.classes.total - 1,
      };
      state.actionLoading = false;
      state.error = null;
    },
    createClass(state, action: PayloadAction<CreateClassQuery>) {
      state.actionLoading = true;
      state.error = null;
    },
    createClassSuccess(state, action: PayloadAction<Class>) {
      state.data.classes = {
        ...state.data.classes,
        data: [action.payload, ...state.data.classes.data],
        total: state.data.classes.total + 1,
      };
      state.actionLoading = false;
    },

    updateClass: (state, action: PayloadAction<ClassDetailTokenQuery>) => {
      state.actionLoading = true;
      state.error = null;
    },
    updateClassSuccess: (state, action: PayloadAction<Class>) => {
      state.actionLoading = false;
      state.error = null;
      state.data.classes = {
        ...state.data.classes,
        data: state.data.classes.data.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    },
    loadClassListError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadClassDetail(state, action: PayloadAction<ClassDetailTokenQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadClassDetailSuccess(state, action) {
      state.data.currentClass = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadClassDetailError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateLeaveFormStatus(state, action: PayloadAction<UpdateLeaveFormStatusQuery>) {
      state.loading = true;
      state.error = null;
    },
    updateLeaveFormStatusSuccess(state, action: PayloadAction<UpdateLeaveFormStatusPayload>) {
      state.loading = false;
      state.error = null;
      state.data.currentClass = {
        ...state.data.currentClass,
        leaveForm: state.data.currentClass.leaveForm.map((leaveForm) => {
          if (leaveForm._id === action.payload.formId) {
            return {
              ...leaveForm,
              status: action.payload.status,
            };
          }
          return leaveForm;
        }),
      };
    },
    Error(state, action: PayloadAction<ClassError>) {
      state.loading = false;
      state.actionLoading = false;
      state.error = action.payload;
    },
  },
});

export const { name, actions: classActions, reducer } = slice;

export const useClassSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: classSaga });
  return {
    actions: slice.actions,
  };
};
