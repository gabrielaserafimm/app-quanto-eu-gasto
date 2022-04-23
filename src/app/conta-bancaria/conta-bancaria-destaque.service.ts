import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
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
    private messageMessage: MessageService
  ) {
    this.contasIds = JSON.parse(localStorage.getItem('destaques')) ?? [];
  }

  getDestaques(): Observable<ContaBancaria[]> {
    const requests = this.contasIds.map((contaBancariaId) =>
      this.ContaBancariaService.findById(contaBancariaId)
    );
    return requests.length ? forkJoin(requests) : of([]) ;
  }

  add({ id, nome }: ContaBancaria) {
    if (this.contasIds.some((contaBancariaId) => contaBancariaId === id)) {
      this.messageMessage.error(`Conta bancária ${nome} já está na sua lista de destaques`);
      return;
    }

    this.contasIds = [...this.contasIds, id];
    
    localStorage.setItem('destaques', JSON.stringify(this.contasIds));
    this.messageMessage.success(`Conta bancária ${nome} foi para a lista de destaques`);
  }

  remove({ id, nome }: ContaBancaria) {
    this.contasIds = this.contasIds.filter((contaBancariaId) => contaBancariaId !== id);
    localStorage.setItem('destaques', JSON.stringify(this.contasIds));
    this.messageMessage.success(`Conta bancária ${nome} removido da lista de destaques!`);
  }
}