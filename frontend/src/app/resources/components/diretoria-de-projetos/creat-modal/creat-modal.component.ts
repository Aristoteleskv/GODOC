import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectItemInterface } from 'ng-zorro-antd/select';
import { NzPlacementType } from 'ng-zorro-antd/tree-select';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}
@Component({
  selector: 'app-creat-modal',
  templateUrl: './creat-modal.component.html',
  styleUrl: './creat-modal.component.scss'
})
export class CreatModalComponent implements OnInit  {
  selectedContacts:  string[] = []; // Inicializa como uma array vazia
  user: any;
  contacts: any; // Use um tipo de array específico, se possível
  error: any;
  isLoading = false;
  mensagem: any;
  fileId: any;
  render: TemplateRef<{ $implicit: NzSelectItemInterface; }>;

  isNotSelected(value: string): boolean {
    return this.selectedContacts.indexOf(value) === -1;
  }
 onModelChange($event: any) {
throw new Error('Method not implemented.');
}
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();

  constructor(
    private token: TokenStorageService,
    private fileService: DocumentoService,
    private notificationService: NotificationService,
    private notification: NzNotificationService,
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
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: index % 2 === 0
    }));
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

  value: string[] = ['0-0-0'];
  nodes = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
          isLeaf: true
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
          isLeaf: true
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
          isLeaf: true
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
          isLeaf: true
        }
      ]
    }
  ];
  placement: NzPlacementType = 'topLeft';
  onChange($event: string[]): void {
    console.log($event);
  }
}
