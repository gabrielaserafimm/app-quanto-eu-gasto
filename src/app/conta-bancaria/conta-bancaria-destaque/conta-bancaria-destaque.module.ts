import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaBancariaDestaquePageRoutingModule } from './conta-bancaria-destaque-routing.module';

import { ContaBancariaDestaquePage } from './conta-bancaria-destaque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContaBancariaDestaquePageRoutingModule
  ],
  declarations: [ContaBancariaDestaquePage]
})
export class ContaBancariaDestaquePageModule {}
