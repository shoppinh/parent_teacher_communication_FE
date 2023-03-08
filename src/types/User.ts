import { ConstantRoles } from 'utils/constants';

export interface User {
  _id: string;
  email?: string;
  avatar?: string;
  username?: string;
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
