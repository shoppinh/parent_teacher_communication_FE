export interface Class {
  _id: string;
  name: string;
}

export interface ClassListTokenQuery {
  token: string;
}

export interface ClassState {
  data: {
    classes: {
      total: number;
      data: Class[];
    };
    currentClass: Class;
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
