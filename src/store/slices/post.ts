import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { postSaga } from 'store/sagas/postSaga';
import { PostListByClassQuery, PostState } from 'types/Post';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

const postCache = loadState()?.post;

export const initialState: PostState = {
  data: { ...postCache?.data },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPostList(state) {
      state.loading = true;
      state.error = null;
    },
    loadPostListByClass(state, action: PayloadAction<PostListByClassQuery>) {
      state.loading = true;
      state.error = null;
    },
    addPost(state, action) {
      state.loading = true;
      state.error = null;
    },
    addPostSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    addPostError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadPostListSuccess(state, action) {
      state.data.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadPostListError(state, action) {
      state.loading = false;
      state.data.posts = {
        data: [],
        total: 0,
      };
      state.error = action.payload;
    },
  },
});

export const { name, actions: postActions, reducer } = slice;

export const usePostSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: postSaga });
  return {
    actions: slice.actions,
  };
};
