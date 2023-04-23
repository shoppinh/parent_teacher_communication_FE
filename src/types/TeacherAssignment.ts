import { Teacher } from './Admin/Teacher';
import { Class } from './Class';
import { Subject } from './Subject';

export interface TeacherAssignmentDetailTokenQuery {
  classId: string;
  token: string;
}
export interface TeacherAssignment {
  _id: string;
  teacherId: Teacher;
  classId: Class;
  subjectId: Subject;
  isClassAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherAssignmentForClass {
  _id: string;
  teacher: Teacher;
  subject: Subject;
}

export interface AssignOrRemoveStudentQuery {
  classId: string;
  studentId: string;
  token: string;
}

export interface TeacherAssignmentPayload {
  teacherId: string;
  classId: string;
  subjectId: string;
  isClassAdmin: boolean;
}

export interface CreateTeacherAssignmentQuery extends TeacherAssignmentPayload {
  token: string;
}

export interface UpdateTeacherAssignmentQuery extends Partial<TeacherAssignmentPayload> {
  token: string;
  teacherAssignmentId: string;
}

export interface TeacherAssignmentDetailQuery {
  token: string;
  teacherAssignmentId: string;
}
