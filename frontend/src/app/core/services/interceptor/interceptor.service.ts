import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';
import { AuthService } from '../../authentication/auth.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private _token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    let token = this._token.getToken();
    if (token != null) {
      if (!authReq.url.toString().includes('refresh')) {
        authReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer' + token
          },
          headers: req.headers.set(TOKEN_HEADER_KEY, token),
        });
      }
    }
    return next.handle(authReq);
}

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
];
