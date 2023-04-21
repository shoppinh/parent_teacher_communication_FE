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
  gender: string;
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

export interface ParentDetailQuery {
  token: string;
  parentId: string;
}

export interface ParentPayload {
  mobilePhone: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  password: string;
  roleKey: string;
  age: number;
  gender: string;
  address: string;
  job: string;
  isActive: boolean;
}

export interface CreateParentQuery extends ParentPayload {
  token: string;
}

export interface UpdateParentQuery extends Partial<ParentPayload> {
  token: string;
  parentId: string;
}

export interface ParentListQuery {
  token: string;
  skip?: number;
  limit?: number;
  search?: string;
}
