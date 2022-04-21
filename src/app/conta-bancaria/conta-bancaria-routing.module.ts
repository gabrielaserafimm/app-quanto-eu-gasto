import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaBancariaPage } from './conta-bancaria.page';

const routes: Routes = [
  {
    path: '',
    component: ContaBancariaPage
  },
  {
    path: 'conta-bancaria-destaque',
    loadChildren: () => import('./conta-bancaria-destaque/conta-bancaria-destaque.module').then( m => m.ContaBancariaDestaquePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaBancariaPageRoutingModule {}
