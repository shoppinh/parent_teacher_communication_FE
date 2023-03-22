import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAddPost,
  apiAddPostComment,
  apiDeletePost,
  apiGetPostList,
  apiGetPostListByClass,
  apiUpdatePost,
} from 'services/api/apiHelper';
import { postActions as actions } from 'store/slices/post';
export function* postSaga() {
  yield all([
    takeLatest(actions.loadPostList.type, getPostList),
    takeLatest(actions.loadPostListByClass.type, getPostListByClass),
    takeLatest(actions.addPost.type, addPost),
    takeLatest(actions.addPostComment.type, addPostComment),
    takeLatest(actions.updatePost.type, updatePost),
    takeLatest(actions.deletePost.type, deletePost),
  ]);
}

const mapPostList = (data: any) => {
  return data?.map((item: any) => {
    return {
      ...item,
      author: {
        ...item.author,
        roleId: item.author.role,
      },
    };
  });
};

export function* getPostList({ payload }: any) {
  try {
    const response = yield call(apiGetPostList, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadPostListSuccess({
          data: mapPostList(response.data.data.data),
          total: response.data.data.totalItem,
        })
      );
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
      yield put(
        actions.loadPostListSuccess({
          data: mapPostList(response.data.data.data),
          total: response.data.data.totalItem,
        })
      );
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

export function* updatePost({ payload }: any) {
  try {
    const response = yield call(apiUpdatePost, payload);
    if (response.data && response.data.status) {
      yield put(actions.updatePostSuccess(response.data.data));
    } else {
      yield put(actions.updatePostError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* deletePost({ payload }: any) {
  try {
    const response = yield call(apiDeletePost, payload);
    if (response.data && response.data.status) {
      yield put(actions.deletePostSuccess(response.data.data));
    } else {
      yield put(actions.deletePostError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
