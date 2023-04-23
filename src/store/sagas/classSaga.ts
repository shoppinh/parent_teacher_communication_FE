import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAddClass,
  apiGetClassDetail,
  apiGetClassListByRole,
  apiRemoveClass,
  apiUpdateClass,
  apiUpdateLeaveFormStatus,
} from 'services/api/apiHelper';
import { classActions as actions } from 'store/slices/class';
import { UpdateLeaveFormStatusQuery } from 'types/Student';
import {
  ClassDetailTokenQuery,
  ClassListTokenQuery,
  CreateClassQuery,
  UpdateClassQuery,
} from '../../types/Class';
import { ConstantRoles } from '../../utils/constants';

export function* classSaga() {
  yield all([
    takeLatest(actions.loadClassList.type, getClassListByRole),
    takeLatest(actions.loadClassDetail.type, getClassDetail),
    takeLatest(actions.updateLeaveFormStatus.type, updateLeaveFormStatus),
    takeLatest(actions.createClass.type, addClassSaga),
    takeLatest(actions.updateClass.type, updateClassSaga),
    takeLatest(actions.removeClass.type, removeClassSaga),
  ]);
}

export function mapClassList(data: any) {
  return data
    .filter((item, index) => {
      return (
        index ===
        data.findIndex((obj) => {
          return obj.class._id === item.class._id;
        })
      );
    })
    .map((item: any) => {
      return {
        _id: item.class._id,
        name: item.class.name,
        createdAt: item.class.createdAt,
        updatedAt: item.class.updatedAt,
      };
    });
}

const parseClassDetail = (data: any) => {
  return {
    _id: data._id,
    classInfo: data.classInfo,
    teacherAssignments: data.teacherAssignments,
    parents: data.parents,
    students: data.students,
    leaveForm: data.leaveForm,
  };
};

const parseUpdateLeaveFormResponse = (data: any) => {
  return {
    formId: data._id,
    status: data.status,
    classId: data.classId,
  };
};
export function* getClassListByRole({ payload }: PayloadAction<ClassListTokenQuery>) {
  const { role } = payload;
  try {
    const response = yield call(apiGetClassListByRole, payload);
    if (response.data && response.data.status) {
      if (role === ConstantRoles.SUPER_USER) {
        yield put(
          actions.loadClassListSuccess({
            data: response.data.data.data,
            total: response.data.data.totalItem,
          })
        );
      } else {
        yield put(
          actions.loadClassListSuccess({
            data: mapClassList(response.data.data.data),
            total: response.data.data.totalItem,
          })
        );
      }
    } else {
      yield put(actions.loadClassListError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
export function* getClassDetail({ payload }: PayloadAction<ClassDetailTokenQuery>) {
  try {
    const response = yield call(apiGetClassDetail, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadClassDetailSuccess(parseClassDetail(response.data.data)));
    } else {
      yield put(actions.loadClassDetailError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* updateLeaveFormStatus({ payload }: PayloadAction<UpdateLeaveFormStatusQuery>) {
  try {
    const response = yield call(apiUpdateLeaveFormStatus, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateLeaveFormStatusSuccess(parseUpdateLeaveFormResponse(response.data.data))
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* addClassSaga({ payload }: { type: string; payload: CreateClassQuery }) {
  try {
    const response = yield call(apiAddClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.createClassSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* updateClassSaga({ payload }: { type: string; payload: UpdateClassQuery }) {
  try {
    const response = yield call(apiUpdateClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateClassSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* removeClassSaga({ payload }: { type: string; payload: ClassDetailTokenQuery }) {
  try {
    const response = yield call(apiRemoveClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeClassSuccess(payload.classId));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
