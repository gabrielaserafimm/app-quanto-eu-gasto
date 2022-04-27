import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaBancariaRegisterPage } from './conta-bancaria-register.page';

const routes: Routes = [
  {
    path: '',
    component: ContaBancariaRegisterPage
  },
  {
  path: ':id',
    component: ContaBancariaRegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaBancariaRegisterPageRoutingModule {}
