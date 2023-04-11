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
  apiGetUnassignedStudentList,
  apiRemoveStudentFromParent,
  apiRemoveStudentFromClass,
  apiUpdateStudent,
} from '../../services/api/apiHelper';
import { studentActions as actions } from '../slices/student';
import { OnlyTokenQuery } from '../../types/Session';
import { AssignOrRemoveStudentQuery } from '../../types/TeacherAssignment';

export function* studentSaga() {
  yield all([
    takeLatest(actions.loadStudentListByClass.type, getStudentListByClass),
    takeLatest(actions.loadStudentListForParent.type, getStudentListByParent),
    takeLatest(actions.loadUnassignedStudentList.type, getUnassignedStudentList),
    takeLatest(actions.updateStudent.type, updateStudent),
    takeLatest(actions.addStudent.type, addStudent),
    takeLatest(actions.removeStudentFromParent.type, removeStudentFromParent),
    takeLatest(actions.removeStudentFromClass.type, removeStudentFromClass),
  ]);
}

const parsedStudentList = (data: any) => {
  return data?.map((student: any) => parsedStudentData(student));
};
const parsedStudentData = (data: any) => {
  return {
    _id: data._id,
    name: data.name,
    age: data.age,
    gender: data.gender,
    classId: data.classId,
    parentId: data.parentId,
    relationship: data.relationship,
    class: data.class,
    parent: data.parent,
  };
};

export function* getStudentListByClass({ payload }: PayloadAction<StudentListByClassTokenQuery>) {
  try {
    const response = yield call(apiGetStudentListByClass, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadedStudentListSuccess({
          totalItem: response.data.data.totalItem,
          data: parsedStudentList(response.data.data.data),
        })
      );
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* getUnassignedStudentList({ payload }: PayloadAction<OnlyTokenQuery>) {
  try {
    const response = yield call(apiGetUnassignedStudentList, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadedUnassignedStudentListSuccess({
          totalItem: response.data.data.totalItem,
          data: parsedStudentList(response.data.data.data),
        })
      );
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* getStudentListByParent({ payload }: PayloadAction<OnlyTokenQuery>) {
  try {
    const response = yield call(apGetStudentListByParent, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadedStudentListSuccess({
          totalItem: response.data.data.totalItem,
          data: parsedStudentList(response.data.data.data),
        })
      );
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

export function* removeStudentFromParent({
  payload,
}: {
  type: string;
  payload: StudentDetailTokenQuery;
}) {
  try {
    const response = yield call(apiRemoveStudentFromParent, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeStudentFromParentSuccess());
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}

export function* removeStudentFromClass({
  payload,
}: {
  type: string;
  payload: AssignOrRemoveStudentQuery;
}) {
  try {
    const response = yield call(apiRemoveStudentFromClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeStudentFromClassSuccess());
    } else yield put(actions.Error(response.data.error));
  } catch (error) {
    console.log(error);
  }
}
