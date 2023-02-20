import { AdminImportSuccess } from './Import';
import { AdminMenuState } from './Menu';
import { AdminOutlet, AdminOutletState } from './Outlet';

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
  outlets: AdminOutletState;
  menus: AdminMenuState;
  outletTemp?: AdminOutlet;
  import: {
    success?: boolean;
    data: AdminImportSuccess;
  };
  config: {
    partners?: Partners[];
  };
  session: {
    currentDataMenuUrl?: string;
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
