import {Injectable} from '@angular/core';
import jwt_decode, {jwtDecode} from 'jwt-decode';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtHelper = new JwtHelperService();
  private readonly tokenKey = 'jwt';


  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);

  }


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp as number);
    return expirationDate < new Date();
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string {
    const token = localStorage.getItem(this.tokenKey)
    if (token == null) {
      return '';
    }
    return token
  }

  hasAuthorization(): boolean {
    const token = this.getToken() as string;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.authorities[0].includes('ADMIN');
  }

  hasUserAuthorization(): boolean {
    const token = this.getToken() as string;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.authorities[0].includes('USER');
  }
}
