import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { PastaService } from 'src/app/core/services/pasta/pasta.service';

@Component({
  selector: 'app-pasta-preview',
  templateUrl: './pasta-preview.component.html',
  styleUrls: ['./pasta-preview.component.scss']
})
export class PastaPreviewComponent implements OnInit {

  id: number;
  pasta: any;
  error: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos: Observable<any>;
  de: any;
  idPasta: any;
  files: any;

  constructor(
    private uploadService: DocumentoService, private activatedRoute: ActivatedRoute,
    private pastaService: PastaService,
     private docService:DocumentoService,
    private router: Router  ) {}
    ngOnInit(): void {
      setTimeout(() => {

      const params = this.activatedRoute.snapshot.params;
      this.pastaService.get(params['id']).subscribe(
        { next: (pastas) => {
          this.pasta = pastas;
          this.getFiles(params['id']);
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
        }
       });


      }, 1000);


      this.imageInfos = this.uploadService.getFiles();

    }


    // Get user details from DB
    getFiles(pasta_id) {
      this.docService.getFilesp(pasta_id).subscribe({ next: (results) => {
        this.files = results;
      },

    error: (err) => {
      this.error = err.error.message;
    }
   });
  }

  formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

    deleteP(id: number) {
      this.pastaService.delete(id)
        .subscribe(res => {
          this.router.navigate(['/pastas']);
        })
    }

    updateP(nome: HTMLInputElement): boolean {
      this.pastaService.updateP(this.pasta.id, nome.value)
        .subscribe(res => {
          this.router.navigate(['/pastas']);
        });
      return false;
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
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }


 

}
