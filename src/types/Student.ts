import { Parent } from './Parent';

export interface Student {
  _id: string;
  name: string;
  age: number;
  gender: string;
  classId: string;
  parentId: string;
  relationship: string;
}
export interface StudentState {
  data: {
    data: Student[];
    totalItem: number;
    currentStudent: Student;
  };
  loading: boolean;
  error: StudentError | null;
}
export interface StudentError {
  code: StudentErrorType | null;
  message?: string;
}
export enum StudentErrorType {
  RESPONSE_ERROR = 400,
}
export interface StudentListResponse {
  data: Student[];
  totalItem: number;
}

export interface StudentListByClassTokenQuery {
  token: string;
  classId: string;
}

export type StudentParentIncludedInfo = Omit<Student, 'parentId'> & {
  parentId: Parent;
};
