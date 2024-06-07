import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { file } from 'src/app/shared/models/document/file';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public URI = environment.Url;


  files:  any; // Sua lista de arquivos
  selectAll: boolean = false; // Variável para controlar o estado do checkbox "selecionar todos"
  searchTextFiles = ''; // Função para alternar a seleção de todos os checkboxes
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    this.files.forEach(file => file.selected = this.selectAll);
  }
  file: file = {
    imagePath: '',
  };
  errorMessage = ''
  error: any;
  alertVisible = false;
  loading = false;
  gatefolds='http://localhost:5000/uploads'
  user: any;
  result: any;
  roles: string[] = [];
  isLoggedIn = false;
  de = null;

  //modal
  isVisible = false;
  isMoveVisible = false;
  Visible: boolean;
  isisible: boolean;
  attachmentList: any = [];
  id: any;
  totalFilesSize: any;
  contacts: any;
  f: boolean;
  tplModalButtonLoading: boolean;
showOkButton: boolean;
showCancelButton: boolean;


  constructor(
    private notification: NzNotificationService,
    private fileService: DocumentoService,
    private contService: ContactService,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    setTimeout(() => {
      this.fileService.getFiles().subscribe(
        {
          next: (files) => {
            this.files = files;
          },
          error: (err) => {
            this.error = err.error.message;
          }
        });

       

        this.contService.getAllUsers()
      .subscribe(
        data => {
          this.contacts = data;
        },

        // this.router.navigateByUrl('/login');
      );

    }, 1);

  }

  formatBytes(bytes: number, decimals: number) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  open(modalId: any): void {
    this.f = true;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  close(modalId: any) {
    this.f = false;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  selectedCard(id: any): void {
    this.router.navigate(['documento/ficheiros/update', id]);
  }


  download(index: string | number) {
    const filename = this.attachmentList[index].uploadname;

    this.fileService.downloadFile(filename)
      .subscribe(
        data => (filename),
        error => console.error(error)
      );
  }
  fileModal(): void {
    this.isisible = true;
  }
  handOk(): void {
    this.isisible = false;
  }
  handCancel(): void {
    this.isisible = false;
  }

  showModal(_id: any): void {
    if (_id === _id) {
      this.isVisible = true;
    } else {

    }
  }
  handleOk(): void {
    this.isVisible = false;
  }


  handleCancel(): void {
    this.isVisible = false;
  }

  showConfirm(id: any): void {
    this.modalService.confirm({
      nzClassName: id,
      nzTitle: 'Confirm',
      nzContent: '<app-share-file [shareFile]="`${id}`"></app-share-file>',
      nzOkText: 'OK',
      nzCancelText: 'Cancel'
    });
  }


  /*Modal pasta list*/
  filePModal(id: any): void {
    this.Visible = true;
  }
  handPOk(): void {
    this.Visible = false;
  }
  handPCancel(): void {
    this.Visible = false;
  }


  shareViaLindk() {
    if (confirm("Generate shareable link ?")) {
        document.getElementById("form-share-via-link").click();
    }
}

shareViaLink(id: any): void {
  this.modalService.create({
    nzClassName: id,
    nzTitle: 'Generate shareable link ?',
    nzContent: "gdfgf dgfd",
    nzOkText: 'OK',
    nzCancelText: 'Cancel'
  });
}
// Função para abrir o modal do arquivo específico
viewFile(file): void {
  // Adiciona a propriedade 'isVisible' ao objeto 'file', se ela não existir
  if (file.isVisible === undefined) {
    file.isVisible = true;
  } else {
    file.isVisible = !file.isVisible; // Alterna a visibilidade
  }
}

// Função para fechar o modal do arquivo específico
viewFileOk(file): void {
  if (file.isVisible !== undefined) {
    file.isVisible = false;
  }
}

// Função para fechar o modal do arquivo específico
viewFileCancel(file): void {
  if (file.isVisible !== undefined) {
    file.isVisible = false;
  }
}


// Função para abrir o modal do arquivo específico
moveFile(file): void {
  // Adiciona a propriedade 'isVisible' ao objeto 'file', se ela não existir
  if (file.isMoveVisible === undefined) {
    file.isMoveVisible = true;
  } else {
    file.isMoveVisible = !file.isMoveVisible; // Alterna a visibilidade
  }
}

// Função para fechar o modal do arquivo específico
moveFileOk(file): void {
  if (file.isMoveVisible !== undefined) {
    file.isMoveVisible = false;
  }
}

// Função para fechar o modal do arquivo específico
moveFileCancel(file): void {
  if (file.isMoveVisible !== undefined) {
    file.isMoveVisible = false;
  }
}








  createTplModal(  tplContent: TemplateRef<{}>): void {
    this.modalService.create({
      nzContent: tplContent,
      nzMaskClosable: true,
      nzClosable: true
    });
  }

  destroyTplModal(modelRef: NzModalRef): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      modelRef.destroy();
    }, 1000);
  }
}
