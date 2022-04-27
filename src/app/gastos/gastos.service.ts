import { Injectable } from '@angular/core';
import { Gasto, Mes, MetodoPagamento, Renda } from './gastos.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GastosService {

  constructor(
    private httpClient: HttpClient,
  ) {}
  
  getGastos(): Observable<Gasto[]> {
    return this.httpClient.get<Gasto[]>(`${environment.apiUrl}/gastos`);
  }

  remove(id: number):Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}/gastos/${id}`);
  }

  findById(id: number): Observable<Gasto> {
    return this.httpClient.get<Gasto>(`${environment.apiUrl}/gastos/${id}`);
  }
  findAll(): Observable<Gasto[]>{
    return this.httpClient.get<Gasto[]>(`${environment.apiUrl}/gastos`);
  }
  save(gasto: Gasto): Observable<Gasto> {
    if(gasto.id){
      return this.httpClient.put<Gasto>(`${environment.apiUrl}/gastos/${gasto.id}`, gasto);
    }
      return this.httpClient.post<Gasto>(`${environment.apiUrl}/gastos`, gasto);
  }
//---------- renda

  getRendas(): Observable<Renda[]> {
    return this.httpClient.get<Renda[]>(`${environment.apiUrl}/rendas`);
  }

  removeRenda(id: number):Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}/rendas/${id}`);
  }

  findByIdRenda(id: number): Observable<Renda> {
    return this.httpClient.get<Renda>(`${environment.apiUrl}/rendas/${id}`);
  }

  saveRenda(renda: Renda): Observable<Renda> {
    if(renda.id){
      return this.httpClient.put<Renda>(`${environment.apiUrl}/rendas/${renda.id}`, renda);
    }
      return this.httpClient.post<Renda>(`${environment.apiUrl}/rendas`, renda);
  }
}
