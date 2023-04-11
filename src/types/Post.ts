import { User } from './User';
import { Comment } from './Comment';
import { Class } from './Class';
export interface Post {
  _id: string;
  title: string;
  content: string;
  description?: string;
  coverImg?: string;
  type?: string;
  attachments?: string[];
  class?: Class;
  author: User;
  comments: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PostQuery {
  title: string;
  content: string;
  description?: string;
  coverImg?: string;
  attachments?: string[];
  type?: string;
}

export interface PostTokenQuery extends PostQuery {
  token: string;
  classId: string;
}

export interface PostListTokenQuery {
  sort?: string;
  order?: string;
  skip?: number;
  limit?: number;
  token: string;
}

export interface PostDetailTokenQuery {
  postId: string;
  token: string;
}

export interface UpdatePostTokenQuery extends PostDetailTokenQuery {
  title: string;
  content: string;
  description?: string;
  coverImg?: string;
  attachments?: string[];
}

export interface PostListByClassQuery extends PostListTokenQuery {
  classId: string;
}

export interface PostState {
  data: {
    posts: {
      total: number;
      data: Post[];
    };
    currentPost: Post;
    comment: {
      data: Comment;
      loading: boolean;
      error: PostError | null;
    };
    addOrUpdatePost: {
      loading: boolean;
      error: PostError | null;
    };
  };
  loading: boolean;
  error: PostError | null;
}

export interface PostError {
  code: PostErrorType | null;
  message?: string;
}
export enum PostErrorType {
  RESPONSE_ERROR = 400,
}
