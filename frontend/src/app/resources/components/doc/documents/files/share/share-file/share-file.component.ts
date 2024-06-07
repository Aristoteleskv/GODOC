import {
  Component,
  Input,OnInit,
  TemplateRef,
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { NzSelectItemInterface } from 'ng-zorro-antd/select';
import { NzPlacementType } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrl: './share-file.component.scss',
})
export class ShareFileComponent implements OnInit { 

  selectedContacts:  string[] = []; // Inicializa como uma array vazia
  user: any;
  mensagem: 'any';

  contacts: any; // Use um tipo de array específico, se possível
  @Input() fileId: string;
  error: any;
  isLoading = false;

  
  constructor(
    private token: TokenStorageService,
    private notificationService: NotificationService,
    private notification: NzNotificationService,
    private fileService: DocumentoService,
    private contService: ContactService,
  ) {
    setTimeout(() => {
      this.contService.getAllUsers().subscribe({
        next: (data) => {
          this.contacts = data;
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    }, 1);
  }
  ngOnInit(): void {

  }
  shareFiles(): void {
    this.user = this.token.getUser().data.id;

    // Verifica se this.selectedContacts é uma array e se cada contato tem a propriedade 'selected'

      const selectedContacts = this.contacts.filter(
        (contact: { selected: any[] }) => contact.selected,
      );

      // Verifica se há contatos selecionados antes de enviar notificações e compartilhar o arquivo
      if (selectedContacts.length > 0) {
        this.notificationService.enviarNotificacao({
          de: this.user,
          para: selectedContacts,
          shared_file_id:this.fileId,
          mensagem: this.mensagem,
        });

        this.fileService
          .shareFileWithContacts(this.fileId, selectedContacts)
          .subscribe({
            next: (response) => {
              this.notification.success(
                'Feito',
                'Arquivo compartilhado com sucesso!',
              );
            },
            error: (err) => {
              this.error = err.error.message;
            },
          });
      } else {
        console.error(
          'Nenhum contato selecionado para compartilhar o arquivo.',
        );
      }

  }

  updateSelection(index: number, isSelected: boolean): void {
    this.contacts[index].selected = isSelected;
  }



 
}
