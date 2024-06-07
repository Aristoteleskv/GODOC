import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../../error/error404/error404.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { CreateComponent } from './envento/create/create.component';
import { ReadComponent } from './envento/read/read.component';
import { UpdateComponent } from './envento/update/update.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EnventosComponent } from './enventos.component';

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
        breadcrumb: 'eventos',
      },
      component: EnventosComponent

    },
    {
      path: 'create',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: CreateComponent

    },
    {
      path: 'lista',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: ReadComponent

    },
    {
      path: 'update/:id',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: UpdateComponent

    },
    {
      path: 'c',
      data: {
        breadcrumb: 'Controlo de acesso',
      },
      component: CategoriaComponent

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
export class EnventosRoutingModule { }
