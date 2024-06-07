import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastaCreateComponent } from './pasta-create/pasta-create.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { PastaPreviewComponent } from './pasta-preview/pasta-preview.component';
import { PastasUploadComponent } from './pastas-upload/pastas-upload.component';
import { ListComponent } from './list/list.component';
export const routes: Routes = [
{
  path: '',
  canActivate: [AuthGuardService],
  canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'pst',
  },
  children: [
    {
      path: 'nova',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: PastaCreateComponent

    },
    {
      path: 'pasta/:id',
      data: {
        breadcrumb: 'Pasta',
      },
      component: PastaPreviewComponent

    },

    {
      path: '',
      data: {
        breadcrumb: 'pastas',
      },
       
      loadChildren: () =>
        import(
          './list/list.module'
        ).then((m) => m.ListModule),
    },
    {
      path: 'file',
      data: {
        breadcrumb: 'Pastas Upload ',
      },
      component: PastasUploadComponent

    },
  ]
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PastaRoutingModule { }
