import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from '../services/token/token-storage.service';
import { Observable } from 'rxjs/internal/Observable';
 
 class UserToken {}
 class Permissions {
   canActivate(user: UserToken, id: string): boolean {
     return true;
   }
 }
@Injectable({
  providedIn: 'root'
})
export class HasRoleService implements CanActivate {
    constructor(
      private _route: Router, 
      private authService: TokenStorageService,
      private _token: TokenStorageService) {}

      canActivate(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot
     ): 
     Observable<boolean|UrlTree>
     |Promise<boolean|UrlTree>|
     boolean|UrlTree 
     {
          return this.authService.getUser();
    }
       
  
}
