import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component'; 
import { ModulosRoutingModule } from './modulos-routing.module';
import { PreviewComponent } from './preview/preview.component';



@NgModule({
  declarations: [
    CreateComponent, 
    PreviewComponent
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule
  ]
})
export class ModulosModule { }
