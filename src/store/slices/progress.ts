import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { classSaga } from '../sagas/classSaga';
import {
  AddProgressTokenQuery,
  Progress,
  ProgressDetailTokenQuery,
  ProgressError,
  ProgressListPayload,
  ProgressListTokenQuery,
  ProgressState,
  UpdateProgressTokenQuery,
} from '../../types/Progress';
import { progressSaga } from '../sagas/progressSaga';

const progressCache = loadState()?.progress;

export const initialState: ProgressState = {
  data: { ...progressCache?.data },
  error: null,
  loading: false,
    currentProgressLoading: false,
};

const slice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    loadProgressList(state, action: PayloadAction<ProgressListTokenQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadedProgressListSuccess(state, action: PayloadAction<ProgressListPayload>) {
      const { data, totalItem } = action.payload;
      state.loading = false;
      state.data.data = data;
      state.data.totalItem = totalItem;
    },
    loadProgressFailed(state, action: PayloadAction<ProgressError>) {
      state.loading = false;
      state.error = action.payload;
    },
    loadProgressDetail(state, action: PayloadAction<ProgressDetailTokenQuery>) {
      state.currentProgressLoading = true;
      state.error = null;
    },
    loadedProgressDetailSuccess(state, action: PayloadAction<Progress>) {
      state.currentProgressLoading = false;
      state.data.currentProgress = action.payload;
    },
    loadedProgressDetailFailed(state, action: PayloadAction<ProgressError>) {
      state.currentProgressLoading = false;
      state.error = action.payload;
    },
    removeProgress(state, action: PayloadAction<ProgressDetailTokenQuery>) {
      state.loading = true;
      state.error = null;
    },
    removeProgressSuccess(state, action: PayloadAction<ProgressDetailTokenQuery>) {
      state.loading = false;
      state.error = null;
    },
    removeProgressFailed(state, action: PayloadAction<ProgressError>) {
      state.loading = false;
      state.error = action.payload;
    },
    addProgress(state, action: PayloadAction<AddProgressTokenQuery>) {
      state.loading = true;
      state.error = null;
    },
    addProgressSuccess(state, action: PayloadAction<Progress>) {
      state.loading = false;
      state.error = null;
    },
    addProgressFailed(state, action: PayloadAction<ProgressError>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProgress(state, action: PayloadAction<UpdateProgressTokenQuery>) {
      state.loading = true;
      state.error = null;
    },
    updateProgressSuccess(state, action: PayloadAction<Progress>) {
      state.loading = false;
      state.error = null;
    },
    updateProgressFailed(state, action: PayloadAction<ProgressError>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { name, actions: progressActions, reducer } = slice;

export const useProgressSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: progressSaga });
  return {
    actions: slice.actions,
  };
};
