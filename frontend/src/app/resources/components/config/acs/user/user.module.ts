import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component'; 
import { UserRoutingModule } from './user-routing.module';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    UpdateComponent, 
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule, 
  ]
})
export class UserModule { }
