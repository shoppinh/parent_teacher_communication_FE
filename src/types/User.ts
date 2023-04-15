import { ConstantRoles } from 'utils/constants';

export interface User {
  _id: string;
  email?: string;
  avatar?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  mobilePhone: string;
  roleId: string;
  role?: string;
  lastLoggedIn?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  userSettings?: UserSettings;
}

export interface UserSettings {
  lang?: string;
}
export type UserPayload = Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'lastLoggedIn'> & {
  password?: string;
};
