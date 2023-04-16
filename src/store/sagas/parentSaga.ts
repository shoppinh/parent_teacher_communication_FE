import { all, call, put, takeLatest } from 'redux-saga/effects';
import { parentActions as actions } from '../slices/parent';
import { AddLeaveFormQuery, StudentLeaveFormListQuery, UpdateLeaveFormQuery } from 'types/Student';
import {
  apiGetStudentLeaveFormList,
  apiSubmitLeaveForm,
  apiUpdateLeaveForm,
} from 'services/api/apiHelper';
export function* parentSaga() {
  yield all([
    takeLatest(actions.loadLeaveFormList.type, loadLeaveFormListSaga),
    takeLatest(actions.submitLeaveForm.type, submitLeaveFormSaga),
    takeLatest(actions.updateLeaveForm.type, updateLeaveFormSaga),
  ]);
}
export const parseLeaveFormListData = (data: any) => {
  return {
    data: data.data,
    totalItem: data.totalItem,
  };
};
export function* loadLeaveFormListSaga({
  payload,
}: {
  type: string;
  payload: StudentLeaveFormListQuery;
}) {
  try {
    const response = yield call(apiGetStudentLeaveFormList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadLeaveFormListSuccess(parseLeaveFormListData(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* submitLeaveFormSaga({ payload }: { type: string; payload: AddLeaveFormQuery }) {
  try {
    const response = yield call(apiSubmitLeaveForm, payload);
    if (response.data && response.data.status) {
      yield put(actions.submitLeaveFormSuccess());
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* updateLeaveFormSaga({ payload }: { type: string; payload: UpdateLeaveFormQuery }) {
  try {
    const response = yield call(apiUpdateLeaveForm, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.updateLeaveFormSuccess({
          ...response.data.data,
          formId: payload.formId,
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}
