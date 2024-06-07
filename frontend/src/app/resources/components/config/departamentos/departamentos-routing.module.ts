import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegistUpdateComponent } from './regist-update/regist-update.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

export const DepartamentosRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },

  {
    path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'departamento',
  },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':id',
        component: RegistUpdateComponent,
      },
      {
        path: ':id/editar',
        component: ListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(DepartamentosRoutes)],
  exports: [RouterModule],
})
export class DepartamentosRoutingModule { }
