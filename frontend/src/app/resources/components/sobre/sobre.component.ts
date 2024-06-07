import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { io } from 'socket.io-client';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Task } from '../../../shared/interfaces/task.interface';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit {
  public tasks: Task[] = [];
  public myForm = this.fb.group({
    name: ['', Validators.required],
  });
  public editTaskValue: string = '';
  naoLidas = 0;
  mensage: string = '';
  mensagem: string = '';
  notifications = [];
  notificacoes: any;
  errorMessage: string;
  dropdownVisible: boolean;
  private socket: any;
  notification_count: number = 0;
  error: any;
  notifica: any;
  para: any;
  de: any;
  shared_file_id: any;
  selectedContacts: any[]; // enviar para n contactos
  constructor(
    private token: TokenStorageService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.notificationService
        .getNotificacoes()
        .subscribe((data: any) => {
          this.notificacoes.push(data);
        });

     
      this.notificationService
        .getNumeroDeNotificacoesNaoLidas()
        .subscribe((data: any) => {
          this.naoLidas = data.naoLidas;
        });

      this.notificationService.getAllNotifi().subscribe({
        next: (pastas: any) => {
          this.notificacoes = pastas; 
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    }, 1);

    this.notificationService.listen();
  }

  getTasks(): void {
    this.notificationService.getTasks().subscribe((data: any) => {
      this.tasks.push(data);
    });
  }
  createTask(): void {
    this.notificationService.createTask(this.myForm.value.name, this.myForm.value.name as string);
    this.myForm.reset();
  }
  deleteTask(id: string): void {
    this.notificationService.deleteTask(id);
  }
  completeTask(id: string): void {
    this.notificationService.completeTask(id);
  }
  call(task: Task) {
    this.editTaskValue = task.name;
  }
  updateTask(id: string, newName: string) {
    this.editTaskValue = newName;
    this.notificationService.updateTask(id, newName, newName);
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
    this.de = this.token.getUser().data.id;
    // Filtra os contatos selecionados
    const selectedContacts = this.selectedContacts.filter((contact: { selected: boolean }) => contact.selected);
    this.notificationService.enviarNotificacao({
      de: this.de,
      para: selectedContacts,
      mensagem: this.mensagem,
    });
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

  createP(): void {
    this.errorMessage = '';

    if (this.mensagem) {
      this.notificationService.adicionarNotificacao(this.mensagem);

      this.notificationService
        .create(this.de, this.para, this.shared_file_id, this.mensagem)
        .subscribe({
          next: (res) => {
            this.notification.success(
              'Feito',
              'enviado ' + this.mensagem + ' com sucesso',
            );
            this.ngOnInit();
          },
          error: (err) => {
            this.errorMessage = err.error.message;
          },
        });
    } else {
      this.errorMessage = 'Certifique-se de preencher tudo ;)';
      let pos = 1;
      ['error'].forEach((method) =>
        // @ts-ignore
        this.modal[method]({
          nzMask: false,
          nzTitle: `Erro`,
          nzContent: `<b>${this.errorMessage}</b>`,
          nzStyle: {
            position: 'relative',
            top: `${pos * 70}px`,
            left: `${pos++ * 50}px`,
          },
        }),
      );

      this.modal.afterAllClose.subscribe(() =>
        console.log('afterAllClose emitted!'),
      );

      setTimeout(() => this.modal.closeAll(), 2000);
    }
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
