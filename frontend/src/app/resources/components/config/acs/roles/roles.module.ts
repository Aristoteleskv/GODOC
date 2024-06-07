import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component'; 
import { RolesRoutingModule } from './roles-routing.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    RolesRoutingModule,
    CommonModule
  ]
})
export class RolesModule { }
