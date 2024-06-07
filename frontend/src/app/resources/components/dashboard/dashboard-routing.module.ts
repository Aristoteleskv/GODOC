import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../../error/error404/error404.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';

export const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    children: [

      {
        path: '',
        data: {
          breadcrumb: 'Recepcao',
        },
        component: DashboardMainComponent

      },
      

      { path: '**', component: Error404Component },
    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
