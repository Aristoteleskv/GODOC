import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public api: string = '/api/kv/config';
  public base: string = this.api + '/roles';

  constructor(private httpApi: ApiService) { }

  listar(options: any = null): Observable<any> {
      return this.httpApi
          .get(`${this.base}`, options)
          .pipe(
              debounceTime(500),
              map((response: Object): any => {
                  return Object(response).object;
              })
          )
  } 
}
