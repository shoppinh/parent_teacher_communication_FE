export interface Subject {
  _id: string;
  name: string;
}

export interface SubjectListQuery {
  token: string;
  skip?: number;
  limit?: number;
  search?: string;
}

export interface SubjectPayload {
  name: string;
}

export interface CreateSubjectQuery extends SubjectPayload {
  token: string;
}

export interface UpdateSubjectQuery extends Partial<SubjectPayload> {
  token: string;
  subjectId: string;
}

export interface SubjectDetailQuery {
  token: string;
  subjectId: string;
}
