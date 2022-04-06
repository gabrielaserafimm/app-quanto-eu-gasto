import { Injectable } from '@angular/core';
import { Gasto, Mes, MetodoPagamento } from './gastos.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private gastos: Gasto[]; 
  private contador = 5;

  constructor() {
    this.gastos = JSON.parse(localStorage.getItem('gastos'))??[];

   }

   public getGastos(){
     return this.gastos;
   }

   public remove(nome: string){
     this.gastos = this.gastos.filter((gasto) => gasto.nome !== nome);
     localStorage.setItem('gastos', JSON.stringify(this.gastos));
   }

   public save(gasto: Gasto){
     if (gasto.id){
       const index = this.gastos.findIndex(g => g.id === gasto.id);
       this.gastos[index] = gasto;
      }else{
       const id = this.contador++;
       this.gastos.push({...gasto,id});
     }
     localStorage.setItem('gastos', JSON.stringify(this.gastos));
    }

    public findById(id: number) {
      return this.gastos.find(gasto => gasto.id === id);
    }
}
