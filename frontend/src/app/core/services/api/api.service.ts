import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HTTP_REQ } from 'src/app/shared/models/common';
import { User } from 'src/app/shared/models/users/user';
import { request } from 'http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  secureService: any;
  //verify
  constructor(private _http: HttpClient) {}

  downloadFile(file: String) {
    const body = {filename: file};
    return this._http.post('http://localhost:3000/file/download', body, {
        responseType : 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getTypeRequest(url: string) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  postTypeRequestl(url: string, payload: any, httpOptions: { headers: HttpHeaders }): Observable<any> {
    return this._http.post<User>(`${this.baseUrl}${url}`, payload, httpOptions).pipe(
      map((response: any) => {
        // Aqui você pode processar a resposta antes de retorná-la, se necessário
        return response;
      })
    );
  }
  postTypeRequest(url: string, payload: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(this.extractData));
  }
   private extractData(res: any){
   let body = res.json();
    return {data: body.data, type: body.type || null} || {};
  }

  putTypeRequest(url: string, payload: any) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  verify(verify: any): Observable<any>{
    const url = `${this.baseUrl}/${verify.id}`;
    return this._http.put<any>(url, verify).pipe(
      map((res) => {
        return res;
      })
    );
  }


  newFolder(path: string, name: string): Observable<any> {
    let data = { path: path, name: name };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options =  httpOptions({ headers: headers });
    return this._http.post(`${this.baseUrl}/new-folder`, JSON.stringify(data))
              .pipe(map(this.extractData),catchError(this.formatErrors));
  }


  public post(path: string, body: Object = {}): Observable<any> {
    return this._http.post(
      environment.api_url + path, body,
      {
        headers: this.secureService.getHeaders
      }
    ).pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this._http.put(
      environment.api_url
      + path,
      body,
      {
        headers: this.secureService.getHeaders
      }
    ).pipe(catchError(this.formatErrors));
  }

  public patch(path: string, body: Object = {}): Observable<any> {
    return this._http.patch(
      environment.api_url
      + path,
      body,
      {
        headers: this.secureService.getHeaders
      }).pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this._http.delete(
      environment.api_url
      + path,
      {
        headers: this.secureService.getHeaders
      }
    ).pipe(catchError(this.formatErrors));
  }

  public get(path: string, httpParams: HttpParams = new HttpParams()): Observable<any> {

    return this._http.get(
      environment.api_url
      + path,
      {
        params: httpParams
      }
    ).pipe(catchError(this.formatErrors));
  }

  public _getWhithFile(path: string, httpParams: HttpParams = new HttpParams()): Observable<any> {

    return this._http.get(
      environment.api_url
      + path,
      {
        responseType: 'blob',
        params: httpParams
      }
    ).pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(JSON.stringify(error));
  }

    // DYNAMIC HTTP OPTIONS
    private generateHttpOptions(params: any, headers: any) {
      const httpOptions: any = {};
      if (params) {
        let httpParams = new HttpParams();
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            const paramValue = params[key];
            httpParams = httpParams.append(key, paramValue);
          }
        }
        httpOptions.params = httpParams;
      }
      if (headers) {
        let httpHeaders = new HttpHeaders();
        for (const key in headers) {
          if (Object.prototype.hasOwnProperty.call(headers, key)) {
            const headerValue = headers[key];
            httpHeaders = httpHeaders.append(key, headerValue);
          }
        }
        httpOptions.headers = httpHeaders;
      }
      return httpOptions;
    }
}




function httpOptions(arg0: { headers: Headers; }) {
  throw new Error('Function not implemented.');
}

