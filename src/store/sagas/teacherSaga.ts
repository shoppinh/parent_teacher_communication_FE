import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGetTeacherAssignmentByClassAndTeacher } from '../../services/api/apiHelper';
import { teacherActions as actions } from '../slices/teacher';
import { TeacherAssignmentDetailTokenQuery } from '../../types/TeacherAssignment';

export function* teacherSaga() {
  yield all([
    takeLatest(actions.loadTeacherAssignmentDetail.type, getTeacherAssignmentByClassAndTeacher),
  ]);
}
export function* getTeacherAssignmentByClassAndTeacher({
  payload,
}: PayloadAction<TeacherAssignmentDetailTokenQuery>) {
  try {
    const response = yield call(apiGetTeacherAssignmentByClassAndTeacher, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedTeacherAssignmentDetailSuccess(response.data.data));
    } else yield put(actions.loadedTeacherAssignmentDetailFail(response.data.error));
  } catch (error) {
    console.log(error);
  }
}
