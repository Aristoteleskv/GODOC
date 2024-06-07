import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { PastaRoutingModule } from './pastas/pastas-routing.module';
import { FilesRoutingModule } from './files/files-routing.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FormsModule } from '@angular/forms';
import { DepachosComponent } from '../depachos/depachos.component';
import { ClassificaComponent } from '../classifica/classifica.component'; 

@NgModule({
  declarations: [
    DocumentsComponent,
    DepachosComponent,
    ClassificaComponent, 
  ],
  imports: [
    DocumentsRoutingModule,
    FilesRoutingModule,
    FormsModule,
    PastaRoutingModule,
    CommonModule,
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
    NzBreadCrumbModule,
    NzMenuModule,
    NzRateModule,
    NzBadgeModule,
    NzLayoutModule,
    NzUploadModule,
    NzAvatarModule,
    NzDividerModule,
    NzSpaceModule,
    NzFormModule,
    NzSelectModule,
    NzDrawerModule,
    NzRadioModule,
    NzCarouselModule,
    NzModalModule,
    NzAffixModule,
    NzAnchorModule,
    NzListModule
  ]
})
export class DocumentsModule { }
