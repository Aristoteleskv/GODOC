import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documento } from 'src/app/shared/models/document/document';
import { ApiService } from '../api/api.service';
import { Observable, catchError, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from '../token/token-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private URI = environment.apiUrlf;
  private URL = environment.apiUrl;
  public appi: string = '/api/kv';
  public base: string = this.appi + '/files';

  constructor(
    private http: HttpClient,
    private _token: TokenStorageService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) {}
  downloadFile(file: String) {
    const body = { filename: file };
    return this.http.post('http://localhost:5000/files/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  moveFile(pasta: any): Observable<any> {
    return this.api.postTypeRequest('pastas/registo', {
      nome: pasta.nome,
      de: pasta.de,
    });
  }
  uPhoto(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.api.postTypeRequest('files/upload', fd);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this._token.getToken()}`,
    );

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.URI}/upload`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  uploadd(
    id_pasta: any,
    pasta_nome: any,
    file: File,
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this._token.getToken()}`,
    );

    formData.append('file', file);
    formData.append('id_pasta', id_pasta);
    formData.append('pasta_nome', pasta_nome);

    const req = new HttpRequest('POST', `${this.URI}/uploadp`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  EntradadeDoc(
    de: any,
    id_pasta: any,
    idPara: any[],
    idDp: any[],
    projecto: any,
    nRegisto: any,
    dataEntrada: any,
    rubrica: any, 
    file: File,
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this._token.getToken()}`,
    ); 
    formData.append('file', file);
    formData.append('de', de);
    formData.append('contacts', JSON.stringify(idPara));
    formData.append('id_pasta', id_pasta);
    formData.append('idDp', JSON.stringify(idDp));
    formData.append('projecto', projecto);
    formData.append('nRegisto', nRegisto);
    formData.append('dataEntrada', dataEntrada);
    formData.append('rubrica', rubrica);
     
    const req = new HttpRequest('POST', `${this.URI}/uploadoc`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  ssEntradadeDoc(
    de: string,
    id_pasta: string,
    idPara: string[] = [],
    idDp: string[] = [],
    projecto: string,
    nRegisto: string,
    dataEntrada: string,
    rubrica: string,
    file: File
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('de', de);
    formData.append('idPasta', id_pasta);
    formData.append('idPara', idPara.join(',')); // Convert arrays to comma-separated strings
    formData.append('idDp', idDp.join(','));
    formData.append('projecto', projecto);
    formData.append('nRegisto', nRegisto);
    formData.append('dataEntrada', dataEntrada);
    formData.append('rubrica', rubrica);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this._token.getToken()}` // Replace with your token retrieval logic
    );

    const req = new HttpRequest('POST', `${this.URI}/uploadoc`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  shareFileWithContacts(
    id: any,
    selectedContacts: any[],
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Inclua outros cabeçalhos necessários aqui
    });

    const body = { contacts: selectedContacts };

    const req = new HttpRequest('POST', `${this.URI}/file/${id}/share`, body, {
      headers: headers,
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      catchError((error) => {
        console.error('Erro ao compartilhar arquivo:', error);
        return throwError(
          () => new Error('Falha ao compartilhar arquivo. Tente novamente.'),
        );
      }),
    );
  }

  share(id: any, selectedContacts: any[]): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.URI}/file/${id}/share`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contacts: selectedContacts }),
      },
      {
        reportProgress: true,
      },
    );

    return this.http.request(req);
  }

  shareFileWithContactss(id: any, selectedContacts: any[]) {
    // Substitua com a URL do seu backend que lida com o compartilhamento de arquivos
    return this.http.post(this.URL + 'file/' + id + '/share', {
      contacts: selectedContacts,
    });
  }
  // Função para solicitar os ficheiros partilhados com o usuário

  getSharedFiles() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this._token.getToken()}`,
    );
    return this.http.get(`${this.URL}files`, { headers });
  }

  createPhoto(
    de: string,
    idPasta: string,
    idPara: string,
    idDp: string,
    projecto: string,
    nRegisto: string,
    data: string,
    status: string,
    rubrica: string,
    file: File,
  ): Observable<HttpEvent<any>> {
    const fd = new FormData();
    fd.append('de ', de);
    fd.append('idPasta', idPasta);
    fd.append('idPara', idPara);
    fd.append('idDp', idDp);
    fd.append('projecto', projecto);
    fd.append('nRegisto', nRegisto);
    fd.append('data', data);
    fd.append('status', status);
    fd.append('rubrica', rubrica);
    fd.append('file', file);
    const req = new HttpRequest('POST', `${this.URI}/uploadd`, fd, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  createImageBlob(file: any, extension: any = null): any {
    const typeMap: any = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',
      pdf: 'application/pdf',
    };

    const ext = extension ? typeMap[extension] : file?.type;
    const blob = new Blob([file], { type: ext });
    const url = window.URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.URI);
  }
  getFilesp(user_id): Observable<File[]> {
    return this.http.get<File[]>(this.URI + '/' + user_id, { observe: 'body' });
  }

  getFilesP(opcoes: any): Observable<File[]> {
    let params = new HttpParams();
    params = params.append('id', opcoes.id);
    return this.api._getWhithFile(`${this.URI}/`, params);
  }
  getSinglefile(id: string | number): Observable<any> {
    return this.api.getTypeRequest('files/' + id);
  }
  getFile(opcoes: any): Observable<Blob> {
    let params = new HttpParams();
    params = params.append('pessoaId', opcoes.pessoaId);
    params = params.append('url', opcoes.url);
    return this.api._getWhithFile(`${this.base}`, params);
  }
  getPhoto(id: string) {
    return this.http.get<Documento>(`${this.URI}/${id}`);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updatePhoto(id: string, title: string, description: string) {
    return this.http.put(`${this.URI}/${id}`, { title, description });
  }
}
