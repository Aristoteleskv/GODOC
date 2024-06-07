import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './resources/components/perfil/profile.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { SobreComponent } from './resources/components/sobre/sobre.component';
import { HistoricoPedidosComponent } from './resources/components/historico-pedidos/historico-pedidos.component';
import { Error404Component } from './resources/error/error404/error404.component';
import { ConfigComponent } from './resources/components/config/config.component';
import { LayoutComponent } from './layout/layout.component';
import { EditaComponent } from './resources/components/perfil/edita/edita.component';
import { Role } from './shared/models/role/role'; 
import { RegisterComponent } from './auth/components/register/register.component';
import { DiretoriaComponent } from './resources/components/diretoria-de-projetos/diretoria/diretoria.component';

export const routes: Routes = [
  { path: 'sobre', component: SobreComponent },
 
  { path: 'register', component: RegisterComponent },
  { path: "users/:id", component: EditaComponent },

  {
    path: 'goe',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'doc',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    children: [
{
        path: 'doc',
        data: {
          breadcrumb: 'Goedoc',
        },
        loadChildren: () =>
          import(
            './resources/components/doc/doc.module'
          ).then((m) => m.DocModule),
      },
      {
        path: 'config',
        component: ConfigComponent,
        data: {
          breadcrumb: 'Configuração',
        },
        loadChildren: () =>
          import(
            './resources/components/config/config.module'
          ).then((m) => m.ConfigModule),
      },

      { path: 'diretoria', component: DiretoriaComponent },
      {
        path: 'evento',
        data: {
          breadcrumb: 'enventos',
        },
        loadChildren: () =>
          import(
            './resources/components/enventos/enventos.module'
          ).then((m) => m.EnventosModule),
      },

      {
        path: 'perfil',
        data: {
          breadcrumb: 'Meu',
        },
        component: ProfileComponent,
        loadChildren: () =>
          import(
            './resources/components/perfil/perfil.module'
          ).then((m) => m.PerfilModule),
      },


      {
        path: 'historicode-pedidos',
        component: HistoricoPedidosComponent,
        canActivate: [AuthGuardService],
      },


    ]
  },

  { path: '**', component: Error404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
