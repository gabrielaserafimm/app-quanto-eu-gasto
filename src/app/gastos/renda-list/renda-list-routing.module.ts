import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RendaListPage } from './renda-list.page';

const routes: Routes = [
  {
    path: '',
    component: RendaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendaListPageRoutingModule {}
