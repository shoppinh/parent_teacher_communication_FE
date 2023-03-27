import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGetClassDetail, apiGetClassListByRole } from 'services/api/apiHelper';
import { classActions as actions } from 'store/slices/class';
import { PayloadAction } from '@reduxjs/toolkit';
import { ClassDetailTokenQuery, ClassListTokenQuery } from '../../types/Class';
import { ConstantRoles } from '../../utils/constants';

export function* classSaga() {
  yield all([
    takeLatest(actions.loadClassList.type, getClassListByRole),
    takeLatest(actions.loadClassDetail.type, getClassDetail),
  ]);
}

export function mapClassList(data: any) {
  return data
    .filter((item, index) => {
      return (
        index ===
        data.findIndex((obj) => {
          return JSON.stringify(obj) === JSON.stringify(item);
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


export function* getClassListByRole({ payload }: PayloadAction<ClassListTokenQuery>) {
  const { role } = payload;
  try {
    const response = yield call(apiGetClassListByRole, payload);
    if (response.data && response.data.status) {
      if (role === ConstantRoles.SUPER_USER) {
        yield put(
          actions.loadClassListSuccess({
            data: response.data.data.data,
            total: response.data.data.total,
          })
        );
      } else {
        yield put(
          actions.loadClassListSuccess({
            data: mapClassList(response.data.data.data),
            total: response.data.data.total,
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
      yield put(actions.loadClassDetailSuccess(response.data.data));
    } else {
      yield put(actions.loadClassDetailError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
