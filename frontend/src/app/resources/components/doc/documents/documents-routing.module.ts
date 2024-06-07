import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { Error404Component } from '../../../error/error404/error404.component';
import { PastasComponent } from './pastas/pastas.component';
import { DepachosComponent } from '../depachos/depachos.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pastas',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    children: [

      {
        path: 'ficheiros',
        data: {
          breadcrumb: 'ficheiros',
        },
        loadChildren: () =>
          import(
            './files/files.module'
          ).then((m) => m.FilesModule),
      },
      {
        path: 'pastas',
        data: {
          breadcrumb: 'pastas',
        },
        component: PastasComponent,
        loadChildren: () =>
          import(
            './pastas/pastas.module'
          ).then((m) => m.PastasModule),
      },
      {
        path: 'despachos',
        data: {
          breadcrumb: 'despacho',
        },
        component: DepachosComponent
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
export class DocumentsRoutingModule { }
