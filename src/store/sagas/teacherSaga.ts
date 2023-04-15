import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAssignStudent,
  apiGetTeacherAssignmentByClassAndTeacher,
} from '../../services/api/apiHelper';
import {
  AssignOrRemoveStudentQuery,
  TeacherAssignmentDetailTokenQuery,
} from '../../types/TeacherAssignment';
import { teacherActions as actions } from '../slices/teacher';

export function* teacherSaga() {
  yield all([
    takeLatest(actions.loadTeacherAssignmentDetail.type, getTeacherAssignmentByClassAndTeacher),
    takeLatest(actions.assignStudent.type, assignStudent),
  ]);
}
export function* getTeacherAssignmentByClassAndTeacher({
  payload,
}: PayloadAction<TeacherAssignmentDetailTokenQuery>) {
  try {
    const response = yield call(apiGetTeacherAssignmentByClassAndTeacher, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedTeacherAssignmentDetailSuccess(response.data.data));
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* assignStudent({ payload }: { type: string; payload: AssignOrRemoveStudentQuery }) {
  try {
    const response = yield call(apiAssignStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.assignStudentSuccess());
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}
