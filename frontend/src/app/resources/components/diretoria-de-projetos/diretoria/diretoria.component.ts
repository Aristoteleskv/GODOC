import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSelectItemInterface } from 'ng-zorro-antd/select';
import { NzPlacementType } from 'ng-zorro-antd/tree-select';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { file } from 'src/app/shared/models/document/file';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Documento } from 'src/app/shared/models/document/document';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-diretoria',
  templateUrl: './diretoria.component.html',
  styleUrl: './diretoria.component.scss',
})
export class DiretoriaComponent {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  de: any;
  error: any;
  loading: any;
  @Input() idPasta: any;
  @Input() pasTanome: any;

  files?: Observable<any>; // Sua lista de arquivos
  selectAll: boolean = false; // Variável para controlar o estado do checkbox "selecionar todos"
  searchTextFiles = ''; // Função para alternar a seleção de todos os checkboxes
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    this.files.forEach((file) => (file.selected = this.selectAll));
  }

  errorMessage = '';
  alertVisible = false;
  gatefolds = 'http://localhost:5000/uploads';
  user: any;
  result: any;
  roles: string[] = [];
  isLoggedIn = false;
  documentos: Documento;
  //modal
  isVisible = false;
  isMoveVisible = false;
  Visible: boolean;
  isisible: boolean;
  attachmentList: any = [];
  id: any;
  totalFilesSize: any;
  f: boolean;
  tplModalButtonLoading: boolean;
  showOkButton: boolean;
  showCancelButton: boolean;

  contactDps: any; // Use um tipo de array específico, se possível
  contacts: any; // Use um tipo de array específico, se possível

  doc: Documento = {
    de: 0,
    idPasta: 0,
    idPara: [],
    idDp: [],
    projecto: '',
    nRegisto: 0,
    dataEntrada: '',
    rubrica: '',
    tmp_name: '',
  };

  role: string;
  permissions: string[];
  modulo: any;
  mensagem: 'any';

  @Input() fileId: string;
  isLoading = false;

  constructor(
    private notification: NzNotificationService,
    private contService: ContactService,
    private token: TokenStorageService,
    private uploadService: DocumentoService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.de = this.token.getUser().user_id;
    this.loading = true;
    this.Documentos();
    this.contacDp();
    this.utilizador();
    this.contacGb();
  }

  contacGb() {
    setTimeout(() => {
      this.loading = false;
      this.contService.getAllUsers().subscribe(
        (data) => {
          this.contacts = data;
        },

        // this.router.navigateByUrl('/login');
      );
    }, 1000);
  }
  contacDp() {
    setTimeout(() => {
      this.loading = false;
      this.contService.getAllDepartamentos().subscribe(
        (data) => {
          this.contactDps = data;
        },

        // this.router.navigateByUrl('/login');
      );
    }, 1000);
  }
  Documentos() {
    setTimeout(() => {
      this.files = this.uploadService.getFiles();
      this.loading = false;
    }, 1000);
  }

  utilizador() {
    this.role = this.token.getCurrentUserRole();
    this.permissions = this.token.getCurrentUserPermissions();
    this.authService.user.subscribe({
      next: (data) => {
        if (data && data.data && Object.keys(data.data).length !== 0) {
          this.user = data.data; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.
        }
        if (
          data &&
          data.data.modulo &&
          Object.keys(data.data.modulo).length !== 0
        ) {
          this.modulo = data.data.modulo; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.
        }
      },
      error: (error) => {
        return error;
      },
    });
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  upload(
    idx: number,
    de: number,
    idPasta: number,
    idPara: any[],
    idDp: any[],
    projecto: any,
    nRegisto: any,
    dataEntrada: any,
    rubrica: any, 
    file: File,
  ): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService
        .EntradadeDoc(
          de,
          idPasta,
          idPara,
          idDp,
          projecto,
          nRegisto,
          dataEntrada,
          rubrica, 
          file,
        )
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(
                (100 * event.loaded) / event.total,
              );
            } else if (event instanceof HttpResponse) {
              const msg = file.name + ': Sucesso!';
              this.message.push(msg);
              this.files = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            this.progressInfos[idx].value = 0;
            let msg = file.name + ': Falhou!';

            if (err.error && err.error.message) {
              msg += ' ' + err.error.message;
            }

            this.message.push(msg);
            this.files = this.uploadService.getFiles();
          },
        });
    }
  }

  uploadFiles(): void {
    this.message = [];
    this.de = this.token.getUser().data.id;
    // Verifica se this.selectedContacts é uma array e se cada contato tem a propriedade 'selected'
    const idPara = this.contacts.filter(
      (contact: { selected: any[] }) => contact.selected,
    );
    const idDp = this.contactDps.filter(
      (contactdp: { selected: any[] }) => contactdp.selected,
    );

    // Verifica se há contatos selecionados antes de enviar notificações e compartilhar o arquivo
    if (idDp.length > 0) {} else {
      console.error('Nenhum idDp selecionado para compartilhar o arquivo.');
    }
    if (idPara.length > 0) {} else {
      console.error(
        'Nenhum contacto selecionado para compartilhar o arquivo.',
      );
    }
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(
          i,
          this.de,
          this.doc.idPasta,
          idPara,
          idDp,
          this.doc.projecto,
          this.doc.nRegisto,
          this.doc.dataEntrada,
          this.doc.rubrica, 
          this.selectedFiles[i],
        );
      }
    }
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
        shared_file_id: this.fileId,
        mensagem: this.mensagem,
      });

      this.uploadService
        .shareFileWithContacts(this.fileId, selectedContacts)
        .subscribe({
          next: (response) => {
            this.notification.success(
              'Feito',
              'Arquivo compartilhado com sucesso!',
            );
            this.files = this.uploadService.getFiles();
          },
          error: (err) => {
            this.error = err.error.message;
          },
        });
    } else {
      console.error('Nenhum contato selecionado para compartilhar o arquivo.');
    }
  }

  updateSelection(index: number, isSelected: boolean): void {
    this.contacts[index].selected = isSelected;
    this.contactDps[index].selected = isSelected;
  }

  formatBytes(bytes: number, decimals: number) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  selectedCard(id: any): void {
    this.router.navigate(['documento/ficheiros/update', id]);
  }

  download(index: string | number) {
    const filename = this.attachmentList[index].uploadname;

    this.uploadService.downloadFile(filename).subscribe(
      (data) => filename,
      (error) => console.error(error),
    );
  }
  /*Modal pasta list upload file*/
  fileModal(): void {
    this.Visible = true;
  }
  handOk(): void {
    this.Visible = false;
  }
  handCancel(): void {
    this.Visible = false;
  }
  /*Modal para dar parecer*/
  ParecerModal(): void {
    this.isVisible = true;
  }
  ParecerOk(): void {
    this.isVisible = false;
  }
  ParecerCancel(): void {
    this.isVisible = false;
  }
}
