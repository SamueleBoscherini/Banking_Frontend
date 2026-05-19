import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Account,Transaction } from '../model/saldo/saldo-module';

@Injectable({
  providedIn: 'root',
})
export class ServizioSaldo {
  private apiUrl = 'bankingapi-production-2687.up.railway.app';

  private constructor(private http: HttpClient) { }

  accounts = signal<Account>({
    id: 0,
    name: "",
    currency: "",
    createdAt: ""
  });

  getBalance(accountId: string): Observable<Account> {
    const data =  this.http.get<Account>(`${this.apiUrl}/accounts/${accountId}`);
    return data;
  }

}
