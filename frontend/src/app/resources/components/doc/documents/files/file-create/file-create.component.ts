import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { DocumentoService } from 'src/app/core/services/document/documento.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-file-create',
  templateUrl: './file-create.component.html',
  styleUrls: ['./file-create.component.scss']
})
export class FileCreateComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>

  isPhotoError = false;
  submitted : boolean = false;
  uploadError: string = '';
  loading = false;
  errorMessage = ''
  error: any;

  photoSelected: string | ArrayBuffer;
  file: File;
  de: null;

  constructor(
    private token: TokenStorageService, private http: HttpClient, private notification: NzNotificationService,private documentoService: DocumentoService, private router: Router) { }
  ngOnInit(): void {
    this.de = this.token.getUser().data.id;
  }




  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(
    idPasta	: HTMLInputElement,
    idPara	: HTMLInputElement,
    idDp	: HTMLInputElement,
    projecto	: HTMLInputElement,
    nRegisto	: HTMLInputElement,
    data	: HTMLInputElement,
    status		: HTMLInputElement,
    rubrica	: HTMLInputElement) {
    this.documentoService
      .createPhoto(
        this.de,
        idPasta.value,
        idPara.value,
        idDp.value,
        projecto.value,
        nRegisto.value,
        data.value,
        status.value,
        rubrica.value,
        this.file)
      .subscribe({
        next: res => {
          console.log(res);
          this.loading = false;
          this.notification.success(
            'Feito',
            'registado com sucesso'
          );
          this.router.navigate(['/doc/ficheiros/novo'])
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.loading = false;
        }
      });
    return false;
  }

  upload(): void {
    this.progress = 0;
    this.loading = true;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.documentoService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            console.log(event);
            this.loading = false;
            this.notification.success(
              'Feito',
              'pasta criado com sucesso'
            );

            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.documentoService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.loading = false;
            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }



  tags = ['DIR', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 10;
    return isLongTag ? `${tag.slice(0, 10)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}



