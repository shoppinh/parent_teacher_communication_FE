export interface User {
  id: number;
  email?: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  mobilePhone: string;
  roleId?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  userSettings?: UserSettings;
}

export interface UserSettings {
  lang?: string;
}
