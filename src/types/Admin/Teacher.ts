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
