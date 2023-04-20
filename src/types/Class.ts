import { Parent } from './Parent';
import { LeaveForm, StudentParentIncludedInfo } from './Student';
import { TeacherAssignmentForClass } from './TeacherAssignment';

export interface Class {
  _id: string;
  name: string;
  isSchoolClass: boolean;
  isPrivateClass: boolean;
}

export interface ClassDetail {
  classInfo: Class;
  students: StudentParentIncludedInfo[];
  teacherAssignments: TeacherAssignmentForClass[];
  parents: Parent[];
  leaveForm: LeaveForm[];
}

export interface ClassListTokenQuery {
  token: string;
  role: string;
}

export interface RemoveClassQuery {
  classId: string;
  token: string;
}
export interface ClassDetailTokenQuery {
  classId: string;
  token: string;
}

export interface ClassState {
  data: {
    classes: {
      total: number;
      data: Class[];
    };
    currentClass: ClassDetail;
  };
  loading: boolean;
  actionLoading: boolean;
  error: ClassError | null;
}

export interface ClassError {
  code: ClassErrorType | null;
  message?: string;
}

export enum ClassErrorType {
  RESPONSE_ERROR = 400,
}

export interface ClassPayload {
  name: string;
  isSchoolClass: boolean;
  isPrivateClass: boolean;
}

export interface UpdateClassQuery extends ClassPayload {
  classId: string;
  token: string;
}

export interface CreateClassQuery extends Partial<ClassPayload> {
  token: string;
}
