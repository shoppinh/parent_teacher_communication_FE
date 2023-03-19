import { all, call, put, takeLatest } from 'redux-saga/effects';
import { progressActions as actions } from 'store/slices/progress';
import {
  apiAddProgress,
  apiGetProgressDetail,
  apiGetProgressListByClass,
  apiRemoveProgress,
  apiUpdateProgress,
} from '../../services/api/apiHelper';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AddProgressTokenQuery,
  ProgressDetailTokenQuery,
  ProgressListTokenQuery,
  UpdateProgressTokenQuery,
} from '../../types/Progress';

export function* progressSaga() {
  yield all([
    takeLatest(actions.loadProgressList.type, getProgressListByClass),
    takeLatest(actions.loadProgressDetail.type, getProgressDetail),
    takeLatest(actions.removeProgress.type, removeProgress),
    takeLatest(actions.addProgress.type, addProgress),
    takeLatest(actions.updateProgress.type, updateProgress),
  ]);
}

export function* getProgressListByClass({ payload }: PayloadAction<ProgressListTokenQuery>) {
  try {
    const response = yield call(apiGetProgressListByClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedProgressListSuccess(response.data.data));
    } else yield put(actions.loadProgressFailed(response.data.error));
  } catch (err) {
    console.log(err);
  }
}

export function* getProgressDetail({ payload }: PayloadAction<ProgressDetailTokenQuery>) {
  try {
    const response = yield call(apiGetProgressDetail, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedProgressDetailSuccess(response.data.data));
    } else yield put(actions.loadedProgressDetailFailed(response.data.error));
  } catch (err) {
    console.log(err);
  }
}
export function* removeProgress({ payload }: PayloadAction<ProgressDetailTokenQuery>) {
  try {
    const response = yield call(apiRemoveProgress, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeProgressSuccess(response.data.data));
    } else yield put(actions.removeProgressFailed(response.data.error));
  } catch (err) {
    console.log(err);
  }
}

export function* addProgress({ payload }: PayloadAction<AddProgressTokenQuery>) {
  try {
    const response = yield call(apiAddProgress, payload);
    if (response.data && response.data.status) {
      yield put(actions.addProgressSuccess(response.data.data));
    } else yield put(actions.addProgressFailed(response.data.error));
  } catch (err) {
    console.log(err);
  }
}

export function* updateProgress({ payload }: PayloadAction<UpdateProgressTokenQuery>) {
  try {
    const response = yield call(apiUpdateProgress, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateProgressSuccess(response.data.data));
    } else yield put(actions.updateProgressFailed(response.data.error));
  } catch (err) {
    console.log(err);
  }
}
