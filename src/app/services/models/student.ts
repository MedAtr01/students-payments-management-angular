/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Student {
  fullName?: string;
  id?: number;
  profile?: string;
  program?: string;
  studentCode?: string;
  user?: User;
}
