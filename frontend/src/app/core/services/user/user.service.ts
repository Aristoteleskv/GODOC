import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/users/user';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUser;
  private readonly baseUr = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwtService: TokenStorageService
  ) { }



  read(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl)
  }

  getUserProfile(username) {
    // debugger
    const headers = new HttpHeaders();
    headers.append("Authorization", "token " + this.jwtService.getToken());

    return this.http
      .get(this.baseUr + "users/"+username, { headers: headers })
      .pipe(
        map((res: Response) => {
          return res
        })
      );
  }
  getUsers(): Observable<any>  {
    return this.http.get(this.baseUrl + '/user', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getUser() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Token " + this.jwtService.getToken());
    return this.http.get<User[]>(`${this.baseUrl}/user`, { headers: headers })
      .pipe(
        tap(data => console.log('Usuários recebidos:', data)),
        catchError(error => {
          // Trate o erro aqui
          return throwError(() => new Error(error));
        })
      );
  }
  
  getUserS() {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .get(`${this.baseUrl}/user`, { headers: headers })
      .pipe(map((res: Response) => res.json()));
  }
  RegisterUser(inputdata:any){
    return this.http.post(this.baseUrl,inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.baseUrl+'/'+id);
  }
  Getall(){
    return this.http.get(this.baseUrl);
  }
  getAllRoles(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .get(this.baseUr + "roles/", { headers: headers })
      .pipe(
        map((res: Response) => {
          return res
        })
      );
  }
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Authorization", "token " + this.jwtService.getToken());

    return this.http
      .get(this.baseUr + "users", { headers: headers })
      .pipe(
        map((res: Response) => {
          return res
        })
      );
  }
  DeleteUser(id) {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    return this.http
      .delete(this.baseUrl + "users/" + id, { headers: headers })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }

  updateuser(id:any,inputdata:any){
    return this.http.put(this.baseUrl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:5000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }


  save(data) {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Token " + this.jwtService.getToken());

    if (!data.id) {
      return this.http
        .post(this.baseUrl + "/users", data, { headers: headers })
        .pipe(
          map((res: Response) => {
            return res.json();
          })
        );
    } else {
      return this.http
        .put(this.baseUrl + "/users/" + data.id, data, {
          headers: headers,
        })
        .pipe(
          map((res: Response) => {
            return res.json();
          })
        );
    }
  }
}
