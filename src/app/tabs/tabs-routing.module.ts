import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
      {
        path: 'inicio',
        loadChildren: () => import('../gastos/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'adicionar',
        loadChildren: () => import('../gastos/adicionar/adicionar.module').then(m => m.AdicionarPageModule)
      },
      {
        path: 'renda-list',
        loadChildren: () => import('../gastos/renda-list/renda-list.module').then(m => m.RendaListPageModule)
      },
      {
        path: 'renda-register',
        loadChildren: () => import('../gastos/renda-register/renda-register.module').then(m => m.RendaRegisterPageModule)
      },
      {
        path: 'conta-bancaria',
        loadChildren: () => import('../conta-bancaria/conta-bancaria.module').then( m => m.ContaBancariaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
