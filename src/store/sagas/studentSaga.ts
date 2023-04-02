import { PayloadAction } from '@reduxjs/toolkit';
import {
  AddStudentQuery,
  StudentDetailTokenQuery,
  StudentListByClassTokenQuery,
  UpdateStudentQuery,
} from '../../types/Student';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apGetStudentListByParent,
  apiAddStudent,
  apiGetStudentListByClass,
  apiRemoveStudent,
  apiUpdateStudent,
} from '../../services/api/apiHelper';
import { studentActions as actions } from '../slices/student';
import { OnlyTokenQuery } from '../../types/Session';

export function* studentSaga() {
  yield all([
    takeLatest(actions.loadStudentListByClass.type, getStudentListByClass),
    takeLatest(actions.loadStudentListForParent.type, getStudentListByParent),
    takeLatest(actions.updateStudent.type, updateStudent),
    takeLatest(actions.addStudent.type, addStudent),
    takeLatest(actions.removeStudent.type, removeStudent),
  ]);
}

export function* getStudentListByClass({ payload }: PayloadAction<StudentListByClassTokenQuery>) {
  try {
    const response = yield call(apiGetStudentListByClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedStudentListSuccess(response.data.data));
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* getStudentListByParent({ payload }: PayloadAction<OnlyTokenQuery>) {
  try {
    const response = yield call(apGetStudentListByParent, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedStudentListSuccess(response.data.data));
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* updateStudent({ payload }: { type: string; payload: UpdateStudentQuery }) {
  try {
    const response = yield call(apiUpdateStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateStudentSuccess(response.data.data));
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* addStudent({ payload }: { type: string; payload: AddStudentQuery }) {
  try {
    const response = yield call(apiAddStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.addStudentSuccess(response.data.data));
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* removeStudent({ payload }: { type: string; payload: StudentDetailTokenQuery }) {
  try {
    const response = yield call(apiRemoveStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeStudentSuccess());
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}
