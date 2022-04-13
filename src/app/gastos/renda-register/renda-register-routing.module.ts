import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RendaRegisterPage } from './renda-register.page';

const routes: Routes = [
  {
    path: '',
    component: RendaRegisterPage
  },
  {
    path: ':id',
    component: RendaRegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendaRegisterPageRoutingModule {}
