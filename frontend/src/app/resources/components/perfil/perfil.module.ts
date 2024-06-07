import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditaComponent } from './edita/edita.component';
import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { PerfilRoutingModule } from './perfile-routing.module';
import { UserComponent } from './user/user.component';
import { WebcamModule } from 'ngx-webcam';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload'; 



@NgModule({
  declarations: [
    EditaComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    HttpClientModule,
    WebcamModule,
    FormsModule,
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
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzAlertModule,
    NzInputNumberModule,
    NzSwitchModule, 
    NzSpinModule,
    NzNotificationModule,
    NzProgressModule,
    NzTableModule,
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
    NzListModule,
  ]
})
export class PerfilModule { }
