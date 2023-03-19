import { PayloadAction } from '@reduxjs/toolkit';
import { StudentListByClassTokenQuery } from '../../types/Student';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apGetStudentListByParent, apiGetStudentListByClass } from '../../services/api/apiHelper';
import { studentActions as actions } from '../slices/student';
import { OnlyTokenQuery } from '../../types/Session';

export function* studentSaga() {
  yield all([
    takeLatest(actions.loadStudentList.type, getStudentListByClass),
    takeLatest(actions.loadStudentListForParent.type, getStudentListByParent),
  ]);
}
export function* getStudentListByClass({ payload }: PayloadAction<StudentListByClassTokenQuery>) {
  try {
    const response = yield call(apiGetStudentListByClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedStudentListSuccess(response.data.data));
    } else yield put(actions.loadedStudentListFail(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* getStudentListByParent({ payload }: PayloadAction<OnlyTokenQuery>) {
  try {
    const response = yield call(apGetStudentListByParent, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedStudentListSuccess(response.data.data));
    } else yield put(actions.loadedStudentListFail(response.data.error));
  } catch (error) {
    console.log(error);
  }
}
