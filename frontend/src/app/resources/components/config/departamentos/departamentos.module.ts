import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RegistUpdateComponent } from './regist-update/regist-update.component';
import { DepartamentosRoutingModule } from './departamentos-routing.module'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DepartamentosComponent } from './departamentos/departamentos.component';



@NgModule({
  declarations: [
    ListComponent,
    RegistUpdateComponent,
    DepartamentosComponent
  ],
  imports: [
    DepartamentosRoutingModule, 
    CommonModule
  ]
})
export class DepartamentosModule { }
