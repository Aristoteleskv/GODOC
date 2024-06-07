import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../../error/error404/error404.component';
import { AuthGuardService } from '../../../core/guards/auth-guard.service';
import { DocComponent } from './doc.component';
import { DocumentsComponent } from './documents/documents.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'goe',
    pathMatch: 'full',
  },
{
  path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'doc',
  },
  children: [

    {
      path: 'goe',
      data: {
        breadcrumb: '·' 
      },
      component: DocComponent,
      loadChildren: () =>
        import(
          '../dashboard/dashboard.module'
        ).then((m) => m.DashboardModule),
    },
    {
      path: 'explore',
      data: {
        breadcrumb: 'explore',
      },
      component: DocumentsComponent,
      loadChildren: () =>
        import(
          './documents/documents.module'
        ).then((m) => m.DocumentsModule),
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
export class DocRoutingModule { }
