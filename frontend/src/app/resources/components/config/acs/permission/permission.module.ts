import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component'; 
import { PermissionRoutingModule } from './permission-routing.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    PermissionRoutingModule,
    CommonModule
  ]
})
export class PermissionModule { }
