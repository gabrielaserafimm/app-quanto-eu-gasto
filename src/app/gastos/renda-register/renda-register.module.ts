import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RendaRegisterPageRoutingModule } from './renda-register-routing.module';

import { RendaRegisterPage } from './renda-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RendaRegisterPageRoutingModule
  ],
  declarations: [RendaRegisterPage]
})
export class RendaRegisterPageModule {}
