
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      breadcrumb: 'SIGT',
    },
    children: [
      {
        path: 'listar',
        data: {
          breadcrumb: 'Listar',
        },
        component: ListComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
