import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import {
  PostDetailTokenQuery,
  PostListByClassQuery,
  PostListTokenQuery,
  PostTokenQuery,
  UpdatePostTokenQuery,
} from 'types/Post';

export const getPostList = async (query: PostListTokenQuery) => {
  const { token, ...rest } = query;
  return new apiClient(token).post(APIs.post.getAllPost, rest);
};

export const getPostListByClass = async (query: PostListByClassQuery) => {
  const { token, classId, ...rest } = query;
  const replaceQuery = APIs.post.getPostListByClass.replace('{classId}', `${classId}`);
  return new apiClient(token).post(replaceQuery, rest);
};

export const addPost = async (query: PostTokenQuery) => {
  const { token, ...rest } = query;
  return new apiClient(token).post(APIs.post.addPost, rest);
};

export const getPostDetail = async (query: PostDetailTokenQuery) => {
  const { token, ...rest } = query;
  const replaceQuery = APIs.post.getPostDetail.replace('{postId}', `${query.postId}`);
  return new apiClient(token).post(replaceQuery, rest);
};

export const updatePost = async (query: UpdatePostTokenQuery) => {
  const { token, postId, ...rest } = query;
  const replaceQuery = APIs.post.updatePost.replace('{postId}', `${postId}`);
  return new apiClient(token).put(replaceQuery, rest);
};

export const deletePost = async (query: PostDetailTokenQuery) => {
  const { token, postId, ...rest } = query;
  const replaceQuery = APIs.post.deletePost.replace('{postId}', `${postId}`);
  return new apiClient(token).delete(replaceQuery, rest);
};
