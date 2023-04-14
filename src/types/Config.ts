import { Class } from './Class';
import { User } from './User';

export interface ConfigState {
  data: ConfigPayload;
  error?: ConfigError | null;
  loading?: boolean;
}
export interface LanguageItem {
  code: string;
  name: string;
}

export interface AdminConfig {
  mobilePhone?: string;
}

export interface ConfigPayload {
  // districts?: District[];
  // wards?: Ward[];
  // cities?: City[];
  admin?: AdminConfig;
  // footers?: FooterConfig;
  // landingPage?: LandingPageConfig;
  lastUpdated?: string | null;
  languages?: LanguageItem[];
  systemSettings?: SystemSetting;
}

export interface SystemSetting {
  schoolInfo: Class;
  userList: User[];
}
export interface LanguageQuery {
  accessToken: string;
  userId: string;
  langCode: string;
}

export interface InvitationQuery {
  accessToken: string;
  email: string;
}

export interface FileUploadQuery {
  file: File;
}

export enum ConfigErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface ConfigError {
  code: ConfigErrorType | null;
  message?: string;
}
