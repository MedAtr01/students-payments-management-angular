/* tslint:disable */
/* eslint-disable */
import {GrantedAuthority} from './granted-authority';

export interface UserDetails {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  password?: string;
  username?: string;
}
