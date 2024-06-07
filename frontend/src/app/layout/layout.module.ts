import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NzImageModule } from 'ng-zorro-antd/image';
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
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarConfiguracaoComponent } from './sidebar/sidebar-configuracao/sidebar-configuracao.component';
import { SidebarDepartamentoComponent } from './sidebar/sidebar-departamento/sidebar-departamento.component';
import { SidebarGabinetComponent } from './sidebar/sidebar-gabinet/sidebar-gabinet.component';
import { HeaderNotificationComponent } from './header/header-notification/header-notification.component';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzDropDownModule,
    NzSelectModule,
    NzTransferModule,
    NzImageModule,
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
export class LayoutModule { }
