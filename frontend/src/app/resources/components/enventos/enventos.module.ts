import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { CreateComponent } from './envento/create/create.component';
import { ReadComponent } from './envento/read/read.component';
import { UpdateComponent } from './envento/update/update.component';
import { EnventosComponent } from './enventos.component';
import { EnventosRoutingModule } from './eventos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTransferModule } from 'ng-zorro-antd/transfer';



@NgModule({
  declarations: [
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    CategoriaComponent,
    EnventosComponent
  ],
  imports: [
    CommonModule,
    EnventosRoutingModule,
    HttpClientModule,
    NzButtonModule,
    NzDropDownModule,
    NzSelectModule,
    NzTransferModule,
    NzDatePickerModule,
    NzTabsModule,
    NzTagModule,
    NzCalendarModule,
    NzIconModule,
    NzInputModule,
    NzAlertModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzSpinModule,
    NzNotificationModule,
    NzProgressModule,
    NzTableModule,
    NzBreadCrumbModule
  ]
})
export class EnventosModule { }
