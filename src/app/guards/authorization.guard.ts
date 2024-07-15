import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../services/token/token.service";
import {JwtHelperService} from '@auth0/angular-jwt';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const jwtHelper = new JwtHelperService();
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.hasAuthorization() && tokenService.isAuthenticated() && tokenService.getToken() != null) {

    return true;

  } else {

    router.navigateByUrl("/login");
    console.log('ser awa ser');

    return false;
  }


};
