import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContaBancaria } from './conta-bancaria.model';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  private contaBancaria: ContaBancaria[];

  constructor(
    private HttpClient: HttpClient) { }

  getConta(): Observable<ContaBancaria[]> {
    return this.HttpClient.get<ContaBancaria[]>(`${environment.apiUrl}/contas`);
  }

  findAll(): Observable<ContaBancaria[]>{
    return this.HttpClient.get<ContaBancaria[]>(`${environment.apiUrl}/contas`);
  }

  save(contaBancaria: ContaBancaria): Observable<ContaBancaria> {
    if(contaBancaria.id){
      return this.HttpClient.put<ContaBancaria>(`${environment.apiUrl}/gastos/${contaBancaria.id}`, contaBancaria);
    }
      return this.HttpClient.post<ContaBancaria>(`${environment.apiUrl}/gastos`, contaBancaria);
  }
  removeConta(id: number):Observable<void>{
    return this.HttpClient.delete<void>(`${environment.apiUrl}/contas/${id}`);
  }

  public findById(id: number) {
    return this.contaBancaria.find(contaBancaria => contaBancaria.id === id);
  }
}
