import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'src/app/core/services/module/module.service';
import { Modulos } from 'src/app/shared/models/modules/modulos';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  filtro: any;
  
  modulos: any;
  pagination: any;
  error: any;
  constructor(private router: Router ,private moduleService: ModuleService) { } 

  ngOnInit(): void {
     
    this.moduleService.read().subscribe(
      {
        next: (modulos) => {
          console.log('Lista : ', modulos);
          this.modulos = modulos;
         },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
        }
      });

  }


  OnI(id: any): void {
    
    this.moduleService.get(id).subscribe(
      {
        next: (modulos) => {
          console.log('Lista : ', modulos);
          this.modulos = modulos;
          this.router.navigate(['/visualizar/:',id])
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
        }
      });

  }
}