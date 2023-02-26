import { User } from './User';
import { Comment } from './Comment';
export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}
