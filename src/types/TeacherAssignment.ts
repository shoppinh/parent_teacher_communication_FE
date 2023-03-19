import { Class } from './Class';
import { Subject } from './subject';
import {Teacher} from "./Admin/Teacher";

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
