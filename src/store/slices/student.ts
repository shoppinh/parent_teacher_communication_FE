import { createSlice } from 'utils/@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { studentSaga } from 'store/sagas/studentSaga';
import {
  StudentListByClassTokenQuery,
  StudentListResponse,
  StudentState,
} from '../../types/Student';
import { PayloadAction } from '@reduxjs/toolkit';
import { OnlyTokenQuery } from '../../types/Session';

const studentCache = loadState()?.config;

export const initialState: StudentState = {
  data: { ...studentCache?.data },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    loadStudentList(state, action: PayloadAction<StudentListByClassTokenQuery>) {
      state.error = null;
      state.loading = true;
    },
    loadedStudentListSuccess(state, action: PayloadAction<StudentListResponse>) {
      const { totalItem, data } = action.payload;
      state.loading = false;
      state.data.totalItem = totalItem;
      state.data.data = data;
    },
    loadedStudentListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadStudentListForParent(state, action: PayloadAction<OnlyTokenQuery>) {
      state.error = null;
      state.loading = true;
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
