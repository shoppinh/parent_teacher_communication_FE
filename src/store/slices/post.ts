import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { postSaga } from 'store/sagas/postSaga';
import {
  PostDetailTokenQuery,
  PostListByClassQuery,
  PostState,
  PostTokenQuery,
  UpdatePostTokenQuery,
} from 'types/Post';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { AddCommentTokenRequest, Comment } from '../../types/Comment';

const postCache = loadState()?.post;

export const initialState: PostState = {
  data: {
    ...(postCache?.data || {
      posts: {
        data: [],
        total: 0,
      },
      currentPost: {},
      comment: {
        loading: false,
        error: null,
        data: {},
      },
      addOrUpdatePost: {
        loading: false,
        error: null,
      },
    }),
  },
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
    addPost(state, action: PayloadAction<PostTokenQuery>) {
      state.data.addOrUpdatePost.loading = true;
      state.data.addOrUpdatePost.error = null;
    },
    addPostSuccess(state, action) {
      state.data.addOrUpdatePost.loading = false;
      state.data.addOrUpdatePost.error = null;
    },
    addPostError(state, action) {
      state.data.addOrUpdatePost.loading = false;
      state.data.addOrUpdatePost.error = action.payload;
    },
    updatePost(state, action: PayloadAction<UpdatePostTokenQuery>) {
      state.data.addOrUpdatePost.loading = true;
      state.data.addOrUpdatePost.error = null;
    },
    updatePostSuccess(state, action) {
      state.data.addOrUpdatePost.loading = false;
      state.data.addOrUpdatePost.error = null;
    },
    updatePostError(state, action) {
      state.data.addOrUpdatePost.loading = false;
      state.data.addOrUpdatePost.error = action.payload;
    },
    deletePost(state, action: PayloadAction<PostDetailTokenQuery>) {
      state.data.addOrUpdatePost.loading = true;
      state.data.addOrUpdatePost.error = null;
    },
    deletePostSuccess(state, action) {
      state.data.addOrUpdatePost.loading = false;
      state.data.addOrUpdatePost.error = null;
    },
    deletePostError(state, action) {
      state.data.addOrUpdatePost.loading = false;
      state.data.addOrUpdatePost.error = action.payload;
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
    addPostComment(state, action: PayloadAction<AddCommentTokenRequest>) {
      state.data.comment.loading = true;
      state.data.comment.error = null;
    },
    addPostCommentSuccess(state, action: PayloadAction<{ list: Comment[]; postId: string }>) {
      state.data.comment.loading = false;
      state.data.comment.error = null;
      state.data = {
        ...state.data,
        posts: {
          ...state.data.posts,
          data: state.data.posts.data.map((post) => {
            if (post._id === action.payload.postId) {
              return {
                ...post,
                comments: action.payload.list,
              };
            }
            return post;
          }),
        },
      };
    },
    addPostCommentError(state, action) {
      state.data.comment.loading = false;
      state.data.comment.error = action.payload;
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
