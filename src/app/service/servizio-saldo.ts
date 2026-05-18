import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account,Transaction } from '../model/saldo/saldo-module';

@Injectable({
  providedIn: 'root',
})
export class ServizioSaldo {
  private apiUrl = 'bankingapi-production-2687.up.railway.app';

  private constructor(private http: HttpClient) { }

  getBalance(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

}
