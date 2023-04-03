import { Parent } from './Parent';
import { Class } from './Class';

export interface Student {
  _id: string;
  name: string;
  age: number;
  gender: string;
  classId: string;
  parentId: string;
  relationship: string;
  class?: Class;
  parent?: Parent;
}

export interface StudentState {
  data: {
    data: Student[];
    totalItem: number;
    currentStudent: Student;
    unassignedStudent: {
      data: Student[];
      totalItem: number;
    };
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
export type AddStudentPayload = Omit<Student, '_id' | 'parentId'>;

export type AddStudentQuery = AddStudentPayload & {
  token: string;
};
export type UpdateStudentQuery = Partial<AddStudentPayload> & {
  studentId: string;
  parentId?: string;
  token: string;
};

export interface StudentDetailTokenQuery {
  token: string;
  studentId: string;
}
