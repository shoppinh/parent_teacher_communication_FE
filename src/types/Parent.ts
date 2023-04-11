import { User } from './User';

export interface Parent {
  _id: string;
  userId: User;
  createdAt: string;
  updatedAt: string;
  address: string;
  age: number;
  job: string;
}