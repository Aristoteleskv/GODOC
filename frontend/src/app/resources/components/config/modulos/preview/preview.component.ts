import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ModuleService } from 'src/app/core/services/module/module.service';
import { Modulos } from 'src/app/shared/models/modules/modulos';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  loading: boolean;
  id: number;

  constructor(private router: ActivatedRoute ,private moduleService: ModuleService) { } 


  modulos: any;
  pagination: any;
  error: any;

  ngOnInit(): void {
    this.loading = true;
    this.router.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((moduloId) => {
        this.id = parseInt(moduloId);
    this.moduleService.get(moduloId).subscribe(
      {
        next: (modulos) => {
          console.log('Lista : ', modulos);
          this.modulos = modulos;
         
        this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
        }
      });
    });
  }

   
}
