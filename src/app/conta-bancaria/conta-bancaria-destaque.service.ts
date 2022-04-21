import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { ContaBancariaService } from './conta-bancaria.service';
import { ContaBancaria } from './conta-bancaria.model';

@Injectable({
  providedIn: 'root',
})
export class ContaBancariaDestaqueService {
  contasIds: number[];

  constructor(
    private ContaBancariaService: ContaBancariaService,
    private messageMessage: MessageService,
  ) {
    this.contasIds = JSON.parse(localStorage.getItem('destaques')) ?? [];
  }

  getDestaques(): Observable<ContaBancaria[]> {
    const requests = this.contasIds.map((contaBancariaId) =>
      this.ContaBancariaService.findById(contaBancariaId)
    );
    return forkJoin(requests);
  }

  add({ id, nome }: ContaBancaria) {
    if(this.contasIds.some(contaBancariaId => contaBancariaId === id)) {
      this.messageMessage.error(`Conta bancária ${nome} não foi para a lista de destaques`);
      return;
    }

    this.contasIds = [...this.contasIds, id];
    
    localStorage.setItem('wishList', JSON.stringify(this.contasIds));
    this.messageMessage.success(`Conta bancária ${nome} foi para a lista de destaques`);
  }
}