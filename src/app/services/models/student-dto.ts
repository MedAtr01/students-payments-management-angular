/* tslint:disable */
/* eslint-disable */
import { UserDto } from '../models/user-dto';
export interface StudentDto {
  fullName?: string;
  id?: number;
  profile?: string;
  program?: string;
  studentCode?: string;
  user?: UserDto;
}
