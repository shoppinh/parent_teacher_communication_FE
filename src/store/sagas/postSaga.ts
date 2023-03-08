import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGetPostList, apiGetPostListByClass } from 'services/api/apiHelper';
import { postActions as actions } from 'store/slices/post';
export function* postSaga() {
  yield all([
    takeLatest(actions.loadPostList.type, getPostList),
    takeLatest(actions.loadPostListByClass.type, getPostListByClass),
  ]);
}

export function* getPostList({ payload }: any) {
  try {
    const response = yield call(apiGetPostList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadPostListSuccess(response.data.data));
    } else {
      yield put(actions.loadPostListError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getPostListByClass({ payload }: any) {
  try {
    const response = yield call(apiGetPostListByClass, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadPostListSuccess(response.data.data));
    } else {
      yield put(actions.loadPostListError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
