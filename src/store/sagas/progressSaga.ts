import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { progressActions as actions } from 'store/slices/progress';
import {
  apiAddProgress,
  apiExportReportCard,
  apiGetProgressDetail,
  apiGetProgressListByClass,
  apiGetProgressListByStudent,
  apiRemoveProgress,
  apiUpdateProgress,
} from '../../services/api/apiHelper';
import {
  AddProgressTokenQuery,
  ProgressDetailTokenQuery,
  ProgressExportTokenQuery,
  ProgressListByStudentTokenQuery,
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
    takeLatest(actions.loadProgressListByStudent.type, getProgressListByStudent),
    takeLatest(actions.exportProgressReportCard.type, exportProgressReportCard),
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

export function* getProgressListByStudent({
  payload,
}: PayloadAction<ProgressListByStudentTokenQuery>) {
  try {
    const response = yield call(apiGetProgressListByStudent, payload);
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

export function* exportProgressReportCard({ payload }: PayloadAction<ProgressExportTokenQuery>) {
  try {
    const response = yield call(apiExportReportCard, payload);
    if (response.data && response.data.status) {
      yield put(actions.exportProgressReportCardSuccess(response.data.data.filePath));
    } else yield put(actions.exportProgressReportCardFailed(response.data.error));
  } catch (err) {
    console.log(err);
  }
}
