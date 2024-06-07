import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PARENT COMPONENT
import { AuthComponent } from './auth.component';
// CHILD COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      // SET DEFAULT LOGIN PAGE
      // LOGIN AND REGISTER PAGES
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'verifica', component: VerifyComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: '/error' },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
