import { User } from './User';

export interface Comment {
  _id: string;
  userId: User;
  postId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddCommentTokenRequest {
  postId: string;
  content: string;
  token: string;
}
