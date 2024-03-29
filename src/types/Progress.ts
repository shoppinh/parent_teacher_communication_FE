import { Subject } from './Subject';
import { Student } from './Student';
import { Class } from './Class';

export interface Progress {
  _id: string;
  frequentMark: number;
  middleExamMark: number;
  finalExamMark: number;
  averageMark: number;
  subjectId: string;
  studentId: string;
  classId: string;
  semester: number;
  year: number;
  subject: Subject;
  student: Student;
  class: Class;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressState {
  data: ProgressListPayload;
  loading: boolean;
  currentProgressLoading: boolean;
  error: ProgressError | null;
  exportLoading: boolean;
}

export interface ProgressListPayload {
  data: Progress[];
  totalItem: number;
  currentProgress: Progress;
}

export interface ProgressError {
  code: ProgressErrorType | null;
  message?: string;
}

export enum ProgressErrorType {
  RESPONSE_ERROR = 400,
}

export interface ProgressListTokenQuery {
  token: string;
  classId: string;
  semester: number;
  year: number;
  sort?: string;
  order?: string;
}

export interface ProgressListByStudentTokenQuery {
  token: string;
  studentId: string;
  semester?: number;
  year?: number;
  sort?: string;
  order?: string;
}

export interface ProgressDetailTokenQuery {
  progressId: string;
  token: string;
}

export interface AddProgressTokenQuery {
  payload: ProgressDetailPayload;
  token: string;
}

export interface UpdateProgressTokenQuery extends AddProgressTokenQuery {
  progressId: string;
}

export interface ProgressDetailPayload {
  frequentMark: number;
  middleExamMark: number;
  finalExamMark: number;
  averageMark: number;
  subjectId: string;
  studentId: string;
  classId: string;
  semester: number;
  year: number;
  note: string;
}

export interface ProgressExportTokenQuery {
  token: string;
  studentId: string;
  semester: number;
  year: number;
}
