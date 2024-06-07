import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DocumentoService } from 'src/app/core/services/document/documento.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  @ViewChild('fileUpoader', { static: false }) fileUpoader: ElementRef<HTMLElement>;

  private baseUrl = 'http://localhost:5000/api/kv/';
  public image: string = '';
  public file_name: string = '';
  public type: string = '';
  public size: number;
  public imageName: string = '';


  photoSelected: string | ArrayBuffer;
  file: File;
  loading = false;
  errorMessage = ''
  error: any;
  file_Name: string;


  @Input()
  requiredFileType: string;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;


  constructor(private http: HttpClient, private notification: NzNotificationService, private fb: FormBuilder, private documentoService: DocumentoService, private router: Router) { }
  ngOnInit() { }

  triggerClick() {
    let fileElement: HTMLElement = this.fileUpoader.nativeElement;
    fileElement.click();
  }

  selectFile(event) {
    this.loading = true;
    const file = (event.target as HTMLInputElement).files[0];

    // Preview image
    if (event.target.files && event.target.files.length > 0) {


    this.imageName = file.name;
    this.type = file.type;
    this.size = file.size;
    this.file_name = file.name;
      const reader = new FileReader();

      const formData = new FormData();
      formData.append("file", file);
      this.loading = false;
      const upload$ = this.http.post("http://localhost:5000/api/kv/files/upload", formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      })
        .pipe(
          finalize(() => this.reset())
        );


      this.uploadSub = upload$.subscribe({
        next: event => {
          console.log(event);
          this.loading = false;


          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            console.log(this.uploadProgress);
            if (this.uploadProgress == 100) {
              this.notification.success(
                'Feito',
                'pasta criado com sucesso'
              );
            }
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.loading = false;
        }
      })


      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.onFileSelect.emit(file);
    }



  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }



  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
  reloadPage(): void {
    window.location.reload();
  }
}
