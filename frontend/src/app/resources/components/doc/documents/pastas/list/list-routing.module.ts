import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGridComponent } from './list-grid/list-grid.component';
import { ListListedComponent } from './list-listed/list-listed.component';
export const routes: Routes = [
  
{
    path: '',  
  children: [

    {
      path: '',
      data: {
        breadcrumb: 'Lista',
      },
      component: ListListedComponent

    },
    {
      path: 'lista/pasta/edit/:id',
      data: {
        breadcrumb: 'Lista',
      },
      component: ListListedComponent

    },
    {
      path: 'bloco',
      data: {
        breadcrumb: 'Blocos',
      },
      component: ListGridComponent

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
export class ListRoutingModule { }
