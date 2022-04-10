import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RendaListPageRoutingModule } from './renda-list-routing.module';

import { RendaListPage } from './renda-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RendaListPageRoutingModule
  ],
  declarations: [RendaListPage]
})
export class RendaListPageModule {}
