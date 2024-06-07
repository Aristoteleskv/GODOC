import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { CreateComponent } from './create/create.component'; 
import { PreviewComponent } from './preview/preview.component';

export const routes: Routes = [
  
{
  path: '',
  redirectTo: '',
  canActivate: [AuthGuardService],
  canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'documents',
  },
  children: [
    {
      path: '',
      data: {
        breadcrumb: 'Modulos',
      },
      component: CreateComponent

    },
    {
      path: 'modulo:id',
      data: {
        breadcrumb: 'Modulos',
      },
      component: CreateComponent

    },
    {
      path: 'visualizar/:id',
      data: {
        breadcrumb: 'Modulos',
      },
      component: PreviewComponent

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
export class ModulosRoutingModule { }
