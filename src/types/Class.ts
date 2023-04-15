import { LeaveForm, Student, StudentParentIncludedInfo } from './Student';
import { Teacher } from './Admin/Teacher';
import { Parent } from './Parent';
import { TeacherAssignment, TeacherAssignmentForClass } from './TeacherAssignment';

export interface Class {
  _id: string;
  name: string;
  isSchoolClass: boolean;
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
  error: ClassError | null;
}

export interface ClassError {
  code: ClassErrorType | null;
  message?: string;
}

export enum ClassErrorType {
  RESPONSE_ERROR = 400,
}
