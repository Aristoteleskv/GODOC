import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from '../services/token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecuryService {

  constructor(private _token: TokenStorageService) {

    const local: string | null = localStorage.getItem(this.current);
    const localToObject: any = local ? JSON.parse(local) : "";
    this.tokenSubject = new BehaviorSubject(localToObject);

  }


  private tokenSubject: BehaviorSubject<any>;
    private current: string = 'currentUserLogin';



    get getHeaders(): HttpHeaders {
      const headersConfig = {
        Accept: 'application/json',

      };

      return new HttpHeaders(headersConfig);
    }

    setToken(token: string): void {
      let object: any = Object(token).object;
      // login successful if there's a jwt token in the response
      if (object) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem(this.current, JSON.stringify(object));
        this.tokenSubject.next(object);
      }
    }



    get getRefresh(): void {
      return;
    }


    public converteTimestampParaData(timestamp: number): Date {
      const data = new Date(timestamp * 1000);
      // data.toISOString()
      return data;
    }



  }
