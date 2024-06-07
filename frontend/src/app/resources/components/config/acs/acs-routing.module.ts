import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

export const routes: Routes = [
{
  path: '',
  canActivate: [AuthGuardService],
  canLoad: [AuthGuardService],
  data: {
    breadcrumb: 'Utilizador',
  },
  children: [{
    path: '',
    data: {
      breadcrumb: 'Utilizador',
    },
    loadChildren: () =>
      import(
        './user/user.module'
      ).then((m) => m.UserModule)

  }, {
    path: 'roles',
    data: {
      breadcrumb: 'Perfis',
    },
    loadChildren: () =>
      import(
        './roles/roles.module'
      ).then((m) => m.RolesModule)

  }, {
    path: 'permissions',
    data: {
      breadcrumb: 'Permissões',
    },
    loadChildren: () =>
      import(
        './permission/permission.module'
      ).then((m) => m.PermissionModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcsRoutingModule { }
