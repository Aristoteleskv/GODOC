import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { PastaService } from 'src/app/core/services/pasta/pasta.service';

@Component({
  selector: 'app-pastas-update',
  templateUrl: './pastas-update.component.html',
  styleUrl: './pastas-update.component.scss'
})
export class PastasUpdateComponent {
  @Input() showBannerup = false; // Inicialmente, o banner está visível
  @Input() idPasta: string;
  // modal
 // Inicialmente, o banner está visível
abrirfechar() {
  this.showBannerup = !this.showBannerup; // Emite o valor atualizado
}
      id: number;
      pasta: any;
      error: any;
      selectedFiles?: FileList;
      progressInfos: any[] = [];

      de: any;

      constructor(
        private uploadService: DocumentoService, private activatedRoute: ActivatedRoute,
        private pastaService: PastaService,
         private docService:DocumentoService,
        private router: Router  ) {}
        ngOnInit(): void {
          setTimeout(() => {

          this.pastaService.get(this.idPasta).subscribe(
            { next: (pastas) => {
              this.pasta = pastas;
            },
            error: (err) => {
              console.log(err);
              this.error = err.error.message;
            }
           });


          }, 1000);

        }


        updateP(nome: HTMLInputElement): boolean {
          this.pastaService.updateP(this.pasta.id, nome.value)
            .subscribe(res => {
              console.log(res);
              this.router.navigate(['/pastas']);
            });
          return false;
        }



    }

