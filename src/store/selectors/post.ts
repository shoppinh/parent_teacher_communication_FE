import { createSelector } from '@reduxjs/toolkit';
import { initialState } from 'store/slices/post';
import { RootState } from 'types';

const selectDomain = (state: RootState) => state.post || initialState;
export const getCurrentPost = createSelector([selectDomain], (state) => state.data.currentPost);
export const getPostError = createSelector([selectDomain], (state) => state.error);
export const getPostLoading = createSelector([selectDomain], (state) => state.loading);
export const getPosts = createSelector([selectDomain], (state) => state.data.posts);
export const getPostList = createSelector([selectDomain], (state) => state.data.posts);
