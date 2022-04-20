import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContaBancaria } from './conta-bancaria.model';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  constructor(
    private HttpClient: HttpClient) { }

  findAll(): Observable<ContaBancaria[]>{
    return this.HttpClient.get<ContaBancaria[]>(`${environment.apiUrl}/contas`);
  }

  save(contaBancaria: ContaBancaria) {
    return this.HttpClient.post(`${environment.apiUrl}/contas`, contaBancaria);
  }
}
