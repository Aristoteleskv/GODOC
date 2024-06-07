import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenStorageService } from '../services/token/token-storage.service';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _route: Router, private AuthService: AuthService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.verificarAcesso(state);
  }

  private verificarAcesso(state: RouterStateSnapshot) {

    if (!this.AuthService.getUser()) {

      this._route.navigate(['goe/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    return true;
  }

}

