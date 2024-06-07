import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { GabinetesRoutingModule } from './gabinetes/gabinetes-routing.module';
import { DepartamentosRoutingModule } from './departamentos/departamentos-routing.module';
import { ModulosRoutingModule } from './modulos/modulos-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [

    ConfigComponent,
     DashboardComponent
  ],
  imports: [
    ConfigRoutingModule,
    GabinetesRoutingModule,
    DepartamentosRoutingModule,
    ModulosRoutingModule,
    CommonModule
  ]
})
export class ConfigModule { }
