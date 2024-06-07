import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/core/services/api/api.service';
import { PastaService } from 'src/app/core/services/pasta/pasta.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { Pasta } from 'src/app/shared/models/pastas/pasta';

@Component({
  selector: 'app-pasta-create',
  templateUrl: './pasta-create.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(300)]),
    ]),
  ],
  styleUrls: ['./pasta-create.component.scss']
})
export class PastaCreateComponent implements OnInit {
  //pasta = new Observable<Pasta[]>();

  pastas: Pasta={
    nome: '',
    de: undefined
  };

  pasta: any[] = [];
  errorMessage = ''
  error: any;
  alertVisible = false;
  loading = false;

  user: any;
  result: any;
  roles: string[] = [];
  isLoggedIn = false;
  de = null;
// modal
@Input() idPasta: any;
@Input() toggleBanner = new EventEmitter<boolean>();
@Input() showBanner = false; // Inicialmente, o banner está visível

abrirfechar() {
  this.showBanner = !this.showBanner;
  this.toggleBanner.emit(this.showBanner); // Emite o valor atualizado
}

  constructor(
    private modal: NzModalService,
  private notification: NzNotificationService,
  private pastaService: PastaService,
  private token: TokenStorageService,
  private router: Router  ) {}

  ngOnInit(): void {
    this.documentos()
  }
  documentos(){
    this.pastaService.read().subscribe(
      { next: (pastas) => {
        this.pasta = pastas;
      },
      error: (err) => {
        this.error = err.error.message;
      }
    });

  }

createP(): void {
  this.errorMessage = '';
  this.de = this.token.getUser().data.id;

    if (this.de && this.pastas.nome) {
    this.loading = true;

    this.pastaService.create({
      nome: this.pastas.nome,
      de: this.de,
    }).subscribe({
     next: res => {
       this.loading = false;
       this.documentos(),
       this.notification.success(
         'Feito',
         'pasta '+this.pastas.nome+' criado com sucesso',
       );
     },
     error: (err) => {
       this.errorMessage = err.error.message;
       this.loading = false;
     }
   });
  } else {
    this.errorMessage = 'Certifique-se de preencher tudo ;)';
    let pos = 1;
    ['error'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: `Erro`,
        nzContent: `<b>${this.errorMessage}</b>`,
        nzStyle: { position: 'relative', top: `${pos * 70}px`, left: `${pos++ * 50}px` }
      })
    );

    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));

    setTimeout(() => this.modal.closeAll(), 2000);
  }

}

update(id:number){

  this.router.navigate(['documento/pasta/update/'+id]);
}



canPasta(): boolean {
 return this.pastas.nome ? true : false;
}



}
