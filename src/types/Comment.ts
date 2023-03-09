import { User } from './User';

export interface Comment {
  _id: string;
  userId: User;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
