import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegistUpdateComponent } from './regist-update/regist-update.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

export const routes: Routes = [
{
  path: '',

  canActivate: [AuthGuardService],
  canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'documents',
  },
  children: [
    {
      path: 'create',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: RegistUpdateComponent

    },
    {
      path: 'lista',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: ListComponent

    },
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GabinetesRoutingModule { }
