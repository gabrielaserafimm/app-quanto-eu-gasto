import { Injectable } from '@angular/core';
import { Gasto, Mes, MetodoPagamento } from './gastos.model';
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

  save(gasto: Gasto): Observable<Gasto> {
    return this.httpClient.post<Gasto>(`${environment.apiUrl}/gastos`, gasto);
  }
}
