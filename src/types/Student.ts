import { LEAVE_FORM_STATUS } from './../utils/constants';
import { Class } from './Class';
import { Parent } from './Parent';

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

export interface LeaveForm {
  _id: string;
  student: Student;
  class: Class;
  reason: string;
  title: string;
  status: LEAVE_FORM_STATUS;
  leaveDate: string;
  createdAt: string;
}

export interface UpdateLeaveFormStatusPayload {
  formId: string;
  status: LEAVE_FORM_STATUS;
  classId: string;
}

export interface AddLeaveFormPayload {
  studentId: string;
  classId: string;
  reason: string;
  title: string;
  leaveDate: string;
}

export interface AddLeaveFormQuery extends AddLeaveFormPayload {
  token: string;
}

export interface UpdateLeaveFormPayload {
  studentId: string;
  classId: string;
  reason?: string;
  title?: string;
  leaveDate?: string;
  formId: string;
}

export interface UpdateLeaveFormQuery extends UpdateLeaveFormPayload {
  token: string;
}

export interface UpdateLeaveFormStatusQuery extends UpdateLeaveFormStatusPayload {
  token: string;
}

export interface StudentLeaveFormListQuery {
  token: string;
  studentId: string;
}
