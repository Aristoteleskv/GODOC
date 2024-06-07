import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PastaService } from 'src/app/core/services/pasta/pasta.service';

@Component({
  selector: 'app-list-grid',
  templateUrl: './list-grid.component.html',
  styleUrls: ['./list-grid.component.scss']
})
export class ListGridComponent implements OnInit {
isVisible: any;
handleOk() {
throw new Error('Method not implemented.');
}
handleCancel() {
throw new Error('Method not implemented.');
}
Visible: any;
handPOk() {
throw new Error('Method not implemented.');
}
handPCancel() {
throw new Error('Method not implemented.');
}
showConfirm(arg0: any) {
throw new Error('Method not implemented.');
}
showModal() {
throw new Error('Method not implemented.');
}
fileModal() {
throw new Error('Method not implemented.');
}
  pasta: any;

  searchTextPastas = '';
  errorMessage = ''
  error: any;
  alertVisible = false;
  loading = false;

  result: any;
  roles: string[] = [];
  isLoggedIn = false;
  de = null;

  constructor(
  private pastaService: PastaService,
  private router: Router  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.pastaService.read().subscribe(
     { next: (pastas) => {
       this.pasta = pastas;
     },
     error: (err) => {
       console.log(err);
       this.error = err.error.message;
     }
    });

  }, 100);

  }

  selectedCard(id: string) {
    this.router.navigate(['doc/pastas/pasta/', id]);
  }

}
