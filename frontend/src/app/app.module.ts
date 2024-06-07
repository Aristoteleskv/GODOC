import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NZ_I18N, pt_PT } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SobreComponent } from './resources/components/sobre/sobre.component';
import { HistoricoPedidosComponent } from './resources/components/historico-pedidos/historico-pedidos.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DashboardComponent } from './resources/components/dashboard/dashboard.component';
import { routes } from './app-routing.module';
import { Error404Component } from './resources/error/error404/error404.component';
import { authInterceptorProviders } from './core/services/interceptor/interceptor.service';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarConfiguracaoComponent } from './layout/sidebar/sidebar-configuracao/sidebar-configuracao.component';
import { SidebarDepartamentoComponent } from './layout/sidebar/sidebar-departamento/sidebar-departamento.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarGabinetComponent } from './layout/sidebar/sidebar-gabinet/sidebar-gabinet.component';
import { NotificationsComponent } from './resources/components/notifications/notifications.component';
import { BuscaComponent } from './resources/components/doc/busca/busca.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { DiretoriaComponent } from './resources/components/diretoria-de-projetos/diretoria/diretoria.component';
import { CreatModalComponent } from './resources/components/diretoria-de-projetos/creat-modal/creat-modal.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { IvyCarouselModule } from 'carousel-angular';   
const config: SocketIoConfig = {
	url: environment.socketUrl,
	options: {}
}

@NgModule({
  declarations: [
    BuscaComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarConfiguracaoComponent,
    SidebarDepartamentoComponent,
    SidebarGabinetComponent,
    AppComponent,
    FooterComponent,
    SobreComponent,
    HistoricoPedidosComponent,
    Error404Component,
    NotificationsComponent,
    DiretoriaComponent,
    CreatModalComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NzSelectModule,
    NzTransferModule,
    NzDatePickerModule,
    IvyCarouselModule,  
    NzTabsModule,
    NzTagModule,
    NzTreeSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzDropDownModule, 
    NzImageModule, 
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
    NzListModule,
    NzCarouselModule, 
    PdfViewerModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes, { useHash: true }), // resolve erro ao chamar componentes
  ],
  providers: [
    authInterceptorProviders,
    AuthGuardService,
    { provide: NZ_I18N, useValue: pt_PT },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
