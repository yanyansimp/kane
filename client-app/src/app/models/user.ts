import { IRole, IRoleClaim } from './role';

export interface IUser {
  id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  birthDate?: Date;
  phoneNumber: string;
  address: string;
  displayName: string;
  username: string;
  token: string;
  image?: string;
  role: string;
  roleClaims: string[];
  lockoutEnd?: Date; 
}

export interface IUserFormValues extends Partial<IUser> {}

export class UserFormValues implements IUserFormValues {
  id: string = '';
  email: string = '';
  password: string = '';
  lastName: string = '';
  firstName: string = '';
  middleName: string = '';
  suffix: string = '';
  birthDate?: Date = undefined;
  phoneNumber: string = '';
  address: string = '';
  role: string = '';
  lockoutEnd?: Date = undefined;

  constructor(init?: IUserFormValues) {
    Object.assign(this, init);
  }
}

export interface IUserFormValues {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  birthDate?: Date;
  phoneNumber: string;
  address: string;
  role: string;
  displayName?: string;
  username?: string;
}
