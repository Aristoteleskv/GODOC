import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { ProfileComponent } from './profile.component';
import { EditaComponent } from './edita/edita.component';
import { UserComponent } from './user/user.component';

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
      path: '',
      data: {
        breadcrumb: 'Perfil',
      },
      component: UserComponent

    },
    {
      path: 'update',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: EditaComponent

    },
    { path: "user/:id", component: EditaComponent },
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
export class PerfilRoutingModule { }
