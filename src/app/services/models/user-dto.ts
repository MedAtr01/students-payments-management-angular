/* tslint:disable */
/* eslint-disable */
import { Role } from '../models/role';
export interface UserDto {
  accountLocked?: boolean;
  email?: string;
  enabled?: boolean;
  password?: string;
  role?: Role;
  userId?: number;
  username?: string;
}
