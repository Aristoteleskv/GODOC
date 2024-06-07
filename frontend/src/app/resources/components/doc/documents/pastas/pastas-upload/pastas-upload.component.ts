import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';

@Component({
  selector: 'app-pastas-upload',
  templateUrl: './pastas-upload.component.html',
  styleUrls: ['./pastas-upload.component.scss']
})
export class PastasUploadComponent implements OnInit {
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
  constructor(
    private token: TokenStorageService, private http: HttpClient, private notification: NzNotificationService,private uploadService: DocumentoService, private router: Router) { }
  ngOnInit(): void {
    this.de = this.token.getUser().user_id;
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
    id_pasta: any,
    pasta_nome: any,
    file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.uploadd(id_pasta, pasta_nome, file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = file.name + ": Sucesso!";
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          let msg = file.name + ": Falhou!";

          if (err.error && err.error.message) {
            msg += " " + err.error.message;
          }

          this.message.push(msg);
          this.imageInfos = this.uploadService.getFiles();
        }});
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.idPasta, this.pasTanome, this.selectedFiles[i]);
      }
    }
  }

}
