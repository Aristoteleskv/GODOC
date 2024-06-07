import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

export const Acsroutes: Routes = [

{
  path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'Configurações',
  },
  children: [
    {
      path: '',
      data: {
        breadcrumb: 'Configurações',
      },
      component: DashboardComponent

    },
    {
      path: 'users',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      loadChildren: () => import('./acs/acs.module').then((m) => m.AcsModule)

    },
    {
      path: 'departamento',
      data: {
        breadcrumb: 'Departamentos',
      },
      loadChildren: () => import('./departamentos/departamentos.module').then((m) => m.DepartamentosModule)

    },

    {
      path: 'gabinetes',
      data: {
        breadcrumb: 'Gabinetes',
      },
      loadChildren: () =>import('./gabinetes/gabinetes.module').then((m) => m.GabinetesModule)
    },
    {
      path: 'modulos',
      data: {
        breadcrumb: 'modulos',
      },
      loadChildren: () =>import('./modulos/modulos.module').then((m) => m.ModulosModule)
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(Acsroutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigRoutingModule { }
