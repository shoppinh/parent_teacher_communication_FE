import { all, call, put, takeLatest } from 'redux-saga/effects';
import { adminActions as actions } from '../slices/admin';
import { ParentListQuery } from 'types/Parent';
import { apiGetParentList } from 'services/api/apiHelper';
export function* adminSaga() {
  yield all([takeLatest(actions.loadParentList.type, loadParentListSaga)]);
}

export function* loadParentListSaga({ payload }: { type: string; payload: ParentListQuery }) {
  try {
    const response = yield call(apiGetParentList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadParentListSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.message));
    }
  } catch (error) {
    console.log(error);
  }
}
