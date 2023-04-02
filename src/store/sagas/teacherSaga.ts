import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAssignStudent,
  apiGetTeacherAssignmentByClassAndTeacher, apiRemoveStudentFromClass,
} from '../../services/api/apiHelper';
import { teacherActions as actions } from '../slices/teacher';
import {
  AssignStudentQuery,
  RemoveStudentQuery,
  TeacherAssignmentDetailTokenQuery,
} from '../../types/TeacherAssignment';

export function* teacherSaga() {
  yield all([
    takeLatest(actions.loadTeacherAssignmentDetail.type, getTeacherAssignmentByClassAndTeacher),
    takeLatest(actions.assignStudent.type, assignStudent),
    takeLatest(actions.removeStudent.type, removeStudent),
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

export function* assignStudent({ payload }: { type: string; payload: AssignStudentQuery }) {
  try {
    const response = yield call(apiAssignStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.assignStudentSuccess());
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* removeStudent({ payload }: { type: string; payload: RemoveStudentQuery }) {
  try {
    const response = yield call(apiRemoveStudentFromClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeStudentSuccess());
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}
