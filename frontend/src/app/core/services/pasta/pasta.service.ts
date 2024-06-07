import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime, map } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Pasta } from 'src/app/shared/models/pastas/pasta';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
interface File {
  id: number;
  file_name: string;
  type: string;
  size: string;
  created_at: string;
}

interface Folder {
  id: number;
  nome: string;
  username: string;
  files: File[];
}
@Injectable({
  providedIn: 'root'
})
export class PastaService {

  private urli = environment.apiUrlp;

  constructor(private http: HttpClient, private api: ApiService) { }

  //categoria
  //ler pasta
  read(): Observable<Folder[]> {
    return this.http.get<any[]>(this.urli).pipe(
      map((data: any[]) =>
        data.reduce((acc: Folder[], item) => {
          const existingFolder = acc.find((f) => f.nome === item.nome);
          if (!existingFolder) {
            acc.push({
              id: item.id,
              nome: item.nome,
              username: item.username,
              files: [
                {
                  id: item.id,
                  file_name: item.file_name,
                  type: item.type,
                  size: item.size,
                  created_at: item.created_at,
                },
              ],
            });
          } else {
            existingFolder.files.push({
              id: item.id,
              file_name: item.file_name,
              type: item.type,
              size: item.size,
              created_at: item.created_at,
            });
          }
          return acc;
        }, [])
      )
    );
  }
  getAllPastas(limitOfResults, page): Observable<any> {
    return this.http.get<any>(this.urli, {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }
  //ler categor
  get(id: string|number): Observable<any> {
    return this.api.getTypeRequest('pastas/' + id);
  }

  //modificar categoria
  edit(pasta: Pasta): Observable<Pasta> {
    const url = `${this.urli}/${pasta.id}`;
    return this.http.put<Pasta>(url, pasta);
  }

  //eliminar categoria
  delete(id: number): Observable<Pasta> {
    const url = `${this.urli}/${id}`;
    return this.http.delete<Pasta>(url);
  }

  updateP(id: number, nome: string) {
    return this.http.put(`${this.urli}/${id}`, {nome});
  }
  createC(pasta: Pasta): Observable<Pasta> {
    return this.http.post<Pasta>(this.urli, pasta);
  }


  create(pasta: Pasta): Observable<Pasta> {
    return this.api.postTypeRequest('pastas/registo', {
      nome: pasta.nome,
      de: pasta.de,
    });
  }

 

}

