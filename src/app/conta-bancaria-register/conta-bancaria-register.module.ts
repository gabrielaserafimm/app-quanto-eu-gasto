import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaBancariaRegisterPageRoutingModule } from './conta-bancaria-register-routing.module';

import { ContaBancariaRegisterPage } from './conta-bancaria-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContaBancariaRegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContaBancariaRegisterPage]
})
export class ContaBancariaRegisterPageModule {}
