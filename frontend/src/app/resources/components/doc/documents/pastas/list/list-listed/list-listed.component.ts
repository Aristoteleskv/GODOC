import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PastaService } from 'src/app/core/services/pasta/pasta.service';

@Component({
  selector: 'app-list-listed',
  templateUrl: './list-listed.component.html',
  styleUrls: ['./list-listed.component.scss']
})
export class ListListedComponent implements OnInit {
  selectAll: boolean = false; // Variável para controlar o estado do checkbox "selecionar todos"
  // Função otimizada para alternar a seleção de todos os checkboxes
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    // Atualização em lote para melhorar o desempenho
    const updatedFiles = this.pasta.map((pasta: any) => {
      return { ...pasta, selected: this.selectAll };
    });
    this.pasta = updatedFiles;
  }
  pasta: any[] = [];
  currentPage = 1;
  itemsPerPage = 20;

  @Input() searchTextPastas = '';
  errorMessage = ''
  error: any;
  alertVisible = false;
  loading = false;
  files: any;

  result: any;
  roles: string[] = [];
  isLoggedIn = false;
  de = null;

  //modal
  isVisible = false;
  Visible: boolean;
  isisible: boolean;
// modal
showBanner = false; // Inicialmente, o banner está visível
showBannerup = false; // Inicialmente, o banner está visível
  past: any;
abrirfechar() {
  this.showBanner = !this.showBanner; // Emite o valor atualizado
}


// Função para abrir o modal do arquivo específico
abrirfecharup(p: { showBannerup: boolean; }): void {
  // Adiciona a propriedade 'isVisible' ao objeto 'file', se ela não existir
  if (p.showBannerup === undefined) {
    p.showBannerup = true;
  } else {
    p.showBannerup = !p.showBannerup; // Alterna a visibilidade
  }
}

close() {
  // Lógica para salvar
  this.showBanner = false; // Oculta o banner
}
  constructor(
  private pastaService: PastaService,
  private notification: NzNotificationService,
  private modalService: NzModalService,
  private router: Router ) {}
  ngOnInit(): void {
    
    this.documents();
}

documents(){
  this.loading = true;
  setTimeout(() => {
    this.pastaService.read().subscribe(
      { next: (pastas) => {
       this.pasta = pastas;
       this.loading = false
      },
      error: (err) => {
        this.error = err.error.message;
      }
     });
  }, 0);
  
}
loadMore(): void {
  this.pastaService.getAllPastas(this.currentPage, this.itemsPerPage)
    .subscribe((data) => {
      this.loading = true;
      this.pasta = data; // Adicione os dados à lista existente
      this.currentPage++; // Avance para a próxima página
    });
}



eliminar(id:number)
{
  this.pastaService.delete(id).subscribe({
    next: res=>{
      this.documents();
      this.pastaService.read();
      this.notification.success(
        'Feito',
        'pasta deletado com sucesso',
      );
    },
   error: err=> console.log(err)
    });
}

formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


selectedCard(id: string) {
  this.router.navigate(['doc/pastas/pasta/', id]);
}

// Exemplo de uso do if else em Angular
processFileName(file: any): string {
  if (file && file.file_name !== null) {
    return file.file_name; // Aplica a lógica de substring se file_name não for nulo
  } else {
    return ''; // Retorna uma string vazia se file_name for nulo ou se o objeto for nulo
  }
}

// Função para abrir o modal do arquivo específico
UploadFile(file: { isVisible: boolean; }): void {
  // Adiciona a propriedade 'isVisible' ao objeto 'file', se ela não existir
  if (file.isVisible === undefined) {
    file.isVisible = true;
  } else {
    file.isVisible = !file.isVisible; // Alterna a visibilidade
  }
}

// Função para fechar o modal do arquivo específico
UploadFileOk(file: { isVisible: boolean; }): void {
  if (file.isVisible !== undefined) {
    file.isVisible = false;
  }
}

// Função para fechar o modal do arquivo específico
UploadFileCancel(file: { isVisible: boolean; }): void {
  if (file.isVisible !== undefined) {
    file.isVisible = false;
  }
}


fileModals(): void {
  this.isisible = true;
}
handOks(): void {
  this.isisible = false;
}
handCancels(): void {
  this.isisible = false;
}
showModal(): void {
  this.isVisible = true;
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
      nzContent: `Bla bla ...${id}`,
      nzOkText: 'OK',
      nzCancelText: 'Cancel'
    });
  }



  /*Modal pasta list upload file*/
  fileModal(): void {
    this.Visible = true;
  }
  handPOk(): void {
    this.Visible = false;
  }
handPCancel(): void {
    this.Visible = false;
  }


  trackByFn(index: any, item: { id: any; }) {
    return item.id; // ou qualquer propriedade única dos itens
  }
}
