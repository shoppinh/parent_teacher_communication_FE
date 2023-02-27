export interface AdminState {
  data: AdminData;
  error?: AdminError | null;
  loading?: boolean;
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
  config: {
    partners?: Partners[];
  };
  session: {};
}

export enum AdminErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface AdminError {
  code: AdminErrorType | null;
  message?: string;
}
