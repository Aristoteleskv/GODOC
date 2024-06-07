import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { PermissinsService } from 'src/app/core/services/permissions/permissins.service';
import { Pagination } from 'src/app/shared/models/pagination.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  permission:any
  permissions:any[] = []

  public pagination = new Pagination();


  filtro = {
    page: 1,
    perPage: 5,
    modulo: null,
    search: ""
  }
  error: any;

  constructor(private permissionServ: PermissinsService) { }


  ngOnInit(): void {
      const options = { ...this.filtro };
    this.permissionServ.read(options).subscribe(
     { next: (permission) => {
      console.log('Lista : ', permission);
       this.permissions = permission;
       this.pagination = this.pagination.deserialize(permission.meta);
       },
     error: (err) => {
       console.log(err);
       this.error = err.error.message;
     }
    });



  }

  // select(ret: TransferSelectChange): void {
  //   console.log('nzSelectChange', ret);
  // }

  // change(ret: TransferChange): void {
  //   console.log('nzChange', ret);
  //   const listKeys = ret.list.map(l => l['key']);
  //   const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
  //   this.list = this.list.map(e => {
  //     if (listKeys.includes(e['key']) && hasOwnKey(e)) {
  //       if (ret.to === 'left') {
  //         delete e.hide;
  //       } else if (ret.to === 'right') {
  //         e.hide = false;
  //       }
  //     }
  //     return e;
  //   });
  // }


  paginate({ event, e }: { event: any; e: any; }) { }
}
