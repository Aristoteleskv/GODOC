import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Socket } from 'ngx-socket-io';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  naoLidas = 0;
  mensage: string = '';
  mensagem: string = '';
  notifications = [];
  errorMessage: string;
  dropdownVisible: boolean;
  notification_count: number = 0;
  error: any;
  notificacoes: any;
  constructor(
    private socket: Socket,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.ouvirNotificacoes();
    this.buscarNotificacoes();


    this.notificationService
      .getNumeroDeNotificacoesNaoLidas()
      .subscribe((data: any) => {
        this.naoLidas = data.naoLidas;
      });


    this.notificationService
      .getNumeroDeNotificacoesNaoLidas()
      .subscribe((data: any) => {
        this.naoLidas = data.naoLidas;
      });
  }

  buscarNotificacoes() {
    this.notificationService.getAllNotifi().subscribe({
      next: (pastas: any) => {
        this.notificacoes = pastas;
        console.log(this.notificacoes);
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }
  ouvirNotificacoes() {
    this.notificationService.ouvirNotificacoes().subscribe(
      (novaNotificacao) => {
        this.notificacoes.push(novaNotificacao);
        console.log(this.notificacoes);
      }
    );
  }


  marcarNotificacaoComoLida(id: string) {
    this.notificationService.marcarComoLida(id);
    // Atualizar a interface do usuário para refletir a notificação como lida
  }

  marcarComoLido(idNotificacao) {
    this.notificationService.marcarComoLido(idNotificacao);
    // Atualizar a interface do usuário
  }

  enviarNotificacao() {
    const mensagem = 'Nova notificação!';
    console.log('Mensagem enviada:', mensagem);
    this.socket.emit('enviar-notificacao', { mensagem });
    // Limpar o campo de entrada após o envio
  }

  computeNotificationCount(): number {
    let count = 0;
    for (let i = 0; i < this.notifications.length; i++) {
      const element = this.notifications[i];
      if (element.read == false) {
        count++;
      }
    }
    return count;
  }
  getLastNotification() {
    this.notificationService.getAllNotifi().subscribe((data) => {
      this.notifications.unshift(data),
        (this.notification_count = this.computeNotificationCount());
    });
  }
  getAllNotifications() {
    this.notificationService.getAllNotifi().subscribe((data) => {
      this.notifications = data;
      this.notification_count = this.computeNotificationCount();
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  ngOnDestroy() {
    this.notificationService.disconnect();
  }
}
