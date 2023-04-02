import { createSlice } from 'utils/@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { studentSaga } from 'store/sagas/studentSaga';
import {
  AddStudentQuery,
  Student,
  StudentListByClassTokenQuery,
  StudentListResponse,
  StudentState,
  UpdateStudentQuery,
} from '../../types/Student';
import { PayloadAction } from '@reduxjs/toolkit';
import { OnlyTokenQuery } from '../../types/Session';
import { RemoveStudentQuery } from '../../types/TeacherAssignment';

const studentCache = loadState()?.student;

export const initialState: StudentState = {
  data: { ...studentCache?.data },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    loadStudentListByClass(state, action: PayloadAction<StudentListByClassTokenQuery>) {
      state.error = null;
      state.loading = true;
    },
    loadedStudentListSuccess(state, action: PayloadAction<StudentListResponse>) {
      const { totalItem, data } = action.payload;
      state.loading = false;
      state.data.totalItem = totalItem;
      state.data.data = data;
    },
    Error(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadStudentListForParent(state, action: PayloadAction<OnlyTokenQuery>) {
      state.error = null;
      state.loading = true;
    },
    updateStudent(state, action: PayloadAction<UpdateStudentQuery>) {
      state.loading = true;
      state.error = null;
    },
    updateStudentSuccess(state, action: PayloadAction<Student>) {
      state.loading = false;
      state.data = {
        ...state.data,
        currentStudent: action.payload,
      };
    },
    addStudent(state, action: PayloadAction<AddStudentQuery>) {
      state.loading = true;
      state.error = null;
    },
    addStudentSuccess(state, action: PayloadAction<Student>) {
      state.loading = false;
      state.data = {
        ...state.data,
        data: [...state.data.data, action.payload],
        totalItem: state.data.totalItem + 1,
      };
    },
    removeStudent(state, action: PayloadAction<RemoveStudentQuery>) {},
    removeStudentSuccess(state) {
      state.loading = false;
    },
  },
});

export const { name, actions: studentActions, reducer } = slice;

export const useStudentSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: studentSaga });
  return {
    actions: slice.actions,
  };
};
