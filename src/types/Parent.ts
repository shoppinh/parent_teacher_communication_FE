import { LeaveForm } from './Student';
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

export interface ParentState {
  data: {
    parent: Parent;
    leaveFormList: {
      data: LeaveForm[];
      totalItem: number;
    };
  };
  loading: boolean;
  error: ParentError | null;
}
export interface ParentError {
  code: ParentErrorCode;
  message: string;
}
export enum ParentErrorCode {
  RESPONSE_ERROR = 400,
}
