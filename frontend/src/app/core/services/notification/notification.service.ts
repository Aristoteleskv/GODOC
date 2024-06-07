import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { Socket } from 'ngx-socket-io';
class MySocket extends Socket {
  constructor() {
    super({
      url: environment.socketUrl,
      options: {
        transports: ['websocket', 'pulling', 'flashsocket'],
        query: {
          room: 'johnazt',
        },
      },
    });
  }
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private  baseUrl = environment.apiUrl;
  private socket: Socket;
   
  constructor(private http: HttpClient, private api: ApiService) {
    this.socket = new MySocket();
  }
  public listen() {
    this.socket.on('connection', () => {
      console.log('server listening...');
    });
  }
  public ouvirNotificacoes() {
    return this.socket.fromEvent<any[]>('notificacao-recebida');
  }

  // Desconectar do servidor WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  public createTask(name: string, cor: string): void {
    this.socket.emit('createTask', { name, cor });
  }
  public deleteTask(id: string): void {
    this.socket.emit('deleteTask', { id });
  }
  public completeTask(id: string): void {
    this.socket.emit('completeTask', { id });
  }
  public updateTask(id: string, newName: string, newcor: string): void {
    this.socket.emit('updateTask', id, newName, newcor);
  }

  public getTasks(): Observable<Task[]> {
    return new Observable<Task[]>((observer: { next: (arg0: Task[]) => void; }) => {
      this.socket.on('getTasks', (data: Task[]) => {
        observer.next(data);
      });
    });
  }
  public getNotificacoes(): Observable<any[]> {
    return new Observable<any[]>((observer: { next: (arg0: any[]) => void; }) => {
      this.socket.on('notificacao-recebida', (data: any[]) => {
        observer.next(data);
      });
    });
  }



  adicionarNotificacao(mensagem: any)  {
    // Lógica para adicionar a notificação à lista
    const notificacoesAtuais = []; // Obtenha a lista atual de notificações
    notificacoesAtuais.push(mensagem);

  }


  marcarComoLida(id: string) {
    this.http.post(`/notificacoes/lida/${id}`, {}).subscribe(() => {
      console.log('Notificação marcada como lida');
    });
  }

  public enviarNotificacao(data) {
    this.socket.emit('enviar-notificacao', data);
}

getAllNotifi(): Observable<any> {
  return this.http
    .get(this.baseUrl + "notificacoes")
    .pipe(
      map((res: Response) => {
        return res;
      })
    );
}

  marcarComoLido(idNotificacao) {
    this.socket.emit('marcar_como_lido', idNotificacao);
  }

  getNumeroDeNotificacoesNaoLidas() {
    return this.http.get('/notificacoes/nao-lidas');
  }
  create(de: any, para: any[], shared_file_id: any, mensagem: any): Observable<HttpEvent<any>> {

    return this.api.postTypeRequest('notificacoes/enviar-notificacao', {
      de: de.de,
      para: para,
      shared_file_id: shared_file_id.shared_file_id,
      mensagem: mensagem.mensagem
    });
  }
}
