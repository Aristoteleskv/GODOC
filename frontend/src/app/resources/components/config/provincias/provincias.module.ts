import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RegistUpdateComponent } from './regist-update/regist-update.component';



@NgModule({
  declarations: [
    ListComponent,
    RegistUpdateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProvinciasModule { }
