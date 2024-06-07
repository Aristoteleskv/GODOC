import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PastaService } from 'src/app/core/services/pasta/pasta.service';

@Component({
  selector: 'app-file-move',
  templateUrl: './file-move.component.html',
  styleUrl: './file-move.component.scss'
})
export class FileMoveComponent {

  contacts: any; // Use um tipo de array específico, se possível
  @Input() fileId: string;
  @Input() fileName: string;
  error: any;
  isLoading = false;


  pasta: any[] = [];
  pastas: any;

  searchTextPastas = '';
  errorMessage = '';
  loading = false;
  currentPage: any;
  itemsPerPage: any;
selectAll: any;

  constructor(
  private pastaService: PastaService,
  private notification: NzNotificationService,
  private DocumentoService: DocumentoService,
  private router: Router ) {}
  ngOnInit(): void {
    this.documents();
}

documents(){
  this.pastaService.read().subscribe(
     { next: (pastas) => {
      this.pasta.push(...pastas);
     },
     error: (err) => {
       this.error = err.error.message;
     }
    });
}
loadMore(): void {
  this.pastaService.getAllPastas(this.currentPage, this.itemsPerPage)
    .subscribe((data) => {
      this.loading = true;
      this.pasta.push(...data); // Adicione os dados à lista existente
      this.currentPage++; // Avance para a próxima página
    });
}


mover(){
  this.DocumentoService.moveFile(this.fileId).subscribe(
    { next: (moveFile) => {

    },
    error: (err) => {
      this.error = err.error.message;
    }
   });
}

}
