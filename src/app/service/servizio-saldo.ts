import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Account,Transaction } from '../model/saldo/saldo-module';

@Injectable({
  providedIn: 'root',
})
export class ServizioSaldo {
  private apiUrl = 'https://bankingapi-production-2687.up.railway.app/';

  private constructor(private http: HttpClient) { }

  private accounts = signal<Account>({
    id: 0,
    owner_name: "",
    currency: "",
    createdAt: "",
    balance: 0
  });

  getBalance(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/accounts/${accountId}/balance`);
  }

  setAccount(account: Account): void {
    this.accounts.set(account);
    localStorage.setItem('account', JSON.stringify(account));
  }

  updateNameCurrency(Name: string, Currency: string): void {
    console.log("dati pre aggiornamento:", this.accounts());  
    this.accounts.update(acc => ({
      ...acc,
      owner_name: Name,
      currency: Currency
    }));
    console.log("Aggiornamento account con dati:", this.accounts());
    localStorage.setItem('account', JSON.stringify(this.accounts()));
  }

  getAccount(): Signal<Account> {
    return this.accounts;
  }

  getAccountName(): string {  
    return this.accounts().owner_name;
  }

  getAccountBalance(): number {
    return this.accounts().balance;
  }
  
  createAccount(ownerName: string, currency: string): Observable<Account> {
    const newAccount = {
      owner_name: ownerName,
      currency: currency
    };
    console.log("Creazione account con dati:", newAccount);
    return this.http.post<Account>(`${this.apiUrl}/accounts`, newAccount);
  }
}
        
