import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAddPost,
  apiAddPostComment,
  apiGetPostList,
  apiGetPostListByClass,
} from 'services/api/apiHelper';
import { postActions as actions } from 'store/slices/post';
export function* postSaga() {
  yield all([
    takeLatest(actions.loadPostList.type, getPostList),
    takeLatest(actions.loadPostListByClass.type, getPostListByClass),
    takeLatest(actions.addPost.type, addPost),
    takeLatest(actions.addPostComment.type, addPostComment),
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

export function* addPost({ payload }: any) {
  try {
    const response = yield call(apiAddPost, payload);
    if (response.data && response.data.status) {
      yield put(actions.addPostSuccess(response.data.data));
    } else {
      yield put(actions.addPostError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* addPostComment({ payload }: any) {
  try {
    const response = yield call(apiAddPostComment, payload);
    if (response.data && response.data.status) {
      yield put(actions.addPostCommentSuccess(response.data.data));
    } else {
      yield put(actions.addPostCommentError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
