import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RegistUpdateComponent } from './regist-update/regist-update.component';
import { GabinetesRoutingModule } from './gabinetes-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    RegistUpdateComponent
  ],
  imports: [
    CommonModule,
    GabinetesRoutingModule
  ]
})
export class GabinetesModule { }
