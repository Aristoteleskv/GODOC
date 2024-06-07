import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcsRoutingModule } from './acs-routing.module';
import { RolesRoutingModule } from './roles/roles-routing.module';
import { PermissionRoutingModule } from './permission/permission-routing.module';
import { UserRoutingModule } from './user/user-routing.module';



@NgModule({
  declarations: [

  ],
  imports: [
    AcsRoutingModule,
    RolesRoutingModule,
    PermissionRoutingModule,
    UserRoutingModule,
    CommonModule
  ]
})
export class AcsModule { }
