import { ConstantRoles } from 'utils/constants';
import { TeacherAssignment } from '../TeacherAssignment';
import { User } from '../User';

export interface Teacher {
  _id: string;
  userId: User;
  createdAt: string;
  updatedAt: string;
  address: string;
  gender: string;
  age: number;
  degree: string;
}

export interface TeacherDetailQuery {
  token: string;
  teacherId: string;
}
export interface TeacherListQuery {
  token: string;
  skip?: number;
  limit?: number;
  search?: string;
}
export interface TeacherState {
  data: {
    data: Teacher;
    assignment: TeacherAssignment;
  };
  loading: boolean;
  error: TeacherError | null;
}

export interface TeacherError {
  code: TeacherErrorType | null;
  message?: string;
}
export enum TeacherErrorType {
  RESPONSE_ERROR = 400,
}
export interface TeacherPayload {
  mobilePhone: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  roleKey: ConstantRoles;
  gender: string;
  address: string;
  degree: string;
  age: number;
  isActive: boolean;
}

export interface UpdateTeacherQuery extends Partial<TeacherPayload> {
  token: string;
  teacherId: string;
}

export interface CreateTeacherQuery extends TeacherPayload {
  token: string;
}
