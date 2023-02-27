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
}
export interface LanguageQuery {
  accessToken: string;
  userId: string;
  langCode: string;
}

export enum ConfigErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface ConfigError {
  code: ConfigErrorType | null;
  message?: string;
}
