import { createSlice } from 'utils/@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { PayloadAction } from '@reduxjs/toolkit';
import { TeacherState } from '../../types/Admin/Teacher';
import { teacherSaga } from '../sagas/teacherSaga';
import {
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
    loadedTeacherAssignmentDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
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
