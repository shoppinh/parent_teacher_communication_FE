import { Parent } from 'types/Parent';
import { Teacher } from './Teacher';

export interface AdminState {
  data: AdminData;
  error?: AdminError | null;
  loading?: boolean;
  actionLoading?: boolean;
}

export interface AdminBasicQuery {
  token: string;
}

export interface AdminConfig {
  partners?: Partners[];
}

export interface Partners {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface AdminData {
  config?: {
    partners?: Partners[];
  };
  session?: {};
  teacher: {
    teacherList?: { data: Teacher[]; totalItem: number };
    currentTeacher?: Teacher;
  };
  parent: {
    parentList?: {
      data?: Parent[];
      totalItem?: number;
    };
    currentParent?: Parent;
  };
}

export enum AdminErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface AdminError {
  code: AdminErrorType | null;
  message?: string;
}
