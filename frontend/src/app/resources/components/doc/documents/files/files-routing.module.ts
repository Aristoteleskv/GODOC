import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { ListComponent } from './list/list.component';
import { FileCreateComponent } from './file-create/file-create.component';

export const routes: Routes = [

  {
    path: '',
      canActivate: [AuthGuardService],
      canLoad: [AuthGuardService],
    data: {
      breadcrumb: 'ficheiros',
    },
    children: [

      {
        path: 'novo',
        data: {
          breadcrumb: 'registo de entrada de documento',
        },
        component: FileCreateComponent

      },
      {
        path: '',
        data: {
          breadcrumb: 'Controlo de acesso',
        },
        component: ListComponent

      },
    
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
export class FilesRoutingModule { }
