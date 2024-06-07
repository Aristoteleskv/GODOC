import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissinsService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient, private api: ApiService) { }

  //categoria
  //ler categoria
  read(options: any): Observable<any> {
    const urlp = `${this.url}permissions`;
    return this.http.get<any>(urlp, options);
  }
   
get(id: string|number): Observable<any> {
  console.log(id);
  return this.api.getTypeRequest('permissions/' + id);
}
  //modificar categoria
  edit(any: any): Observable<any> {
    const url = `${this.url}/${any.id}`;
    return this.http.put<any>(url, any);
  }

  //eliminar categoria
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }

  createC(any: any): Observable<any> {
    return this.http.post<any>(this.url, any);
  }


  create(pasta: any): Observable<any> {
    return this.api.postTypeRequest('pastas/registo', {
      nome: pasta.nome,
      de: pasta.de,
    });
  }

}

