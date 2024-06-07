import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token/token-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly baseUrl = environment.apiUrl;
  headers: any
  constructor(
    private http: HttpClient,
    private jwtService: TokenStorageService
  ) { }




  create(role): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .post(this.baseUrl + "roles", role, { headers: headers })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }

  getAllRoles(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .get(this.baseUrl + "roles", { headers: headers })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }

  DeleteRole(id) {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .delete(this.baseUrl + "roles/" + id, { headers: headers })
      .pipe(
        map((res: Response) => {
          return res
        })
      );
  }
}
