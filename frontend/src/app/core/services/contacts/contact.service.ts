import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/shared/models/users/user';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly baseUrl = environment.apiUser;
  private readonly baseUr = environment.apiUrl;
  contactData = {
    username: [],
    email:  [],
  };

  contactsSubject$ = new BehaviorSubject(this.contactData);

  constructor(
    private http: HttpClient,
    private jwtService: TokenStorageService
  ) {
    let localCartData = JSON.parse(localStorage.getItem('user'));
    if (localCartData) this.contactData = localCartData;

    this.contactsSubject$.next(this.contactData);
   }



  read(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl)
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
  getAllDepartamentos(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Authorization", "token " + this.jwtService.getToken());
    return this.http
      .get(this.baseUr + "departamentos", { headers: headers })
      .pipe(
        map((res: Response) => {
          return res
        })
      );
  }
 




}

