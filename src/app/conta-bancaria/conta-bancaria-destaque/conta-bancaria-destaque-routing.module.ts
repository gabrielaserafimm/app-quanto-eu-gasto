import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaBancariaDestaquePage } from './conta-bancaria-destaque.page';

const routes: Routes = [
  {
    path: '',
    component: ContaBancariaDestaquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaBancariaDestaquePageRoutingModule {}
