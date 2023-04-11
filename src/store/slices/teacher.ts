import { createSlice } from 'utils/@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { PayloadAction } from '@reduxjs/toolkit';
import { TeacherError, TeacherState } from '../../types/Admin/Teacher';
import { teacherSaga } from '../sagas/teacherSaga';
import {
  AssignOrRemoveStudentQuery,
  TeacherAssignment,
  TeacherAssignmentDetailTokenQuery,
} from '../../types/TeacherAssignment';

const teacherCache = loadState()?.teacher;

export const initialState: TeacherState = {
  data: { ...teacherCache?.data },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    loadTeacherAssignmentDetail(state, action: PayloadAction<TeacherAssignmentDetailTokenQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadedTeacherAssignmentDetailSuccess(state, action: PayloadAction<TeacherAssignment>) {
      state.loading = false;
      state.data.assignment = action.payload;
    },
    Error(state, action: PayloadAction<TeacherError>) {
      state.loading = false;
      state.error = action.payload;
    },
    assignStudent(state, action: PayloadAction<AssignOrRemoveStudentQuery>) {
      state.loading = true;
      state.error = null;
    },
    assignStudentSuccess(state) {
      state.loading = false;
    },
  },
});

export const { name, actions: teacherActions, reducer } = slice;

export const useTeacherSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: teacherSaga });
  return {
    actions: slice.actions,
  };
};
