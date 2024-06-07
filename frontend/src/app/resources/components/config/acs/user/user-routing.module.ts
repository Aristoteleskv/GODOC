import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboar',
  },
{
  path: '',
  // canActivate: [AuthGuard],
  data: {
    breadcrumb: 'Utilizador',
  },
  children: [
  {
    path: '',
    data: {
      breadcrumb: 'lista',
    },
    component: ListComponent
  },
  { path: "add", component: UpdateComponent },
  { path: "users/:id", component: UpdateComponent },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
