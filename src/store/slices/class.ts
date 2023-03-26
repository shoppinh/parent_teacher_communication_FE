import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { postSaga } from 'store/sagas/postSaga';
import { PostListByClassQuery, PostState } from 'types/Post';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {ClassDetailTokenQuery, ClassListTokenQuery, ClassState} from '../../types/Class';
import { classSaga } from '../sagas/classSaga';

const classCache = loadState()?.class;

export const initialState: ClassState = {
  data: { ...classCache?.data },
  error: null,
  loading: false,
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
