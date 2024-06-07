import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modulos } from 'src/app/shared/models/modules/modulos';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

 //private urli = environment.apiUrlCT;
 private url= 'http://localhost:5000/api/kv/modulos';
 private urlm= 'http://localhost:5000/api/kv/users/modulos';

  constructor(private http: HttpClient, private api: ApiService) { }

  //categoria
  //ler categoria
  read(): Observable<Modulos> {
    return this.http.get<Modulos>(this.url);
  }
  //ler categoria
  reader(): Observable<Modulos> {
    return this.http.get<Modulos>(this.url);
  }
 //ler categor
get(id: string|number): Observable<any> {
  console.log(id);
  return this.api.getTypeRequest('modulos/' + id);
}
  //modificar categoria
  edit(modulo: Modulos): Observable<Modulos> {
    const url = `${this.url}/${modulo.id}`;
    return this.http.put<Modulos>(url, modulo);
  }

  //eliminar categoria
  delete(id: number): Observable<Modulos> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Modulos>(url);
  }

  createC(modulo: Modulos): Observable<Modulos> {
    return this.http.post<Modulos>(this.url, modulo);
  }


  create(modulo: Modulos): Observable<Modulos> {
    return this.api.postTypeRequest('modulos/registo', {
      nome: modulo.nome,
      sigla: modulo.sigla,
    });
  }

}

