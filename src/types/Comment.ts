import { User } from './User';

export interface Comment {
  _id: string;
  author: User;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
