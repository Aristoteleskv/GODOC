import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
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
      .post(this.baseUrl + "departamentos", role, { headers: headers })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }

  getAllDepartas(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .get(this.baseUrl + "departamentos", { headers: headers })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }

  DeleteDepartas(id) {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .delete(this.baseUrl + "departamentos/" + id, { headers: headers })
      .pipe(
        map((res: Response) => {
          return res
        })
      );
  }
}
