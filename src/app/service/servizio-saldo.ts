import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Transactions } from '../model/saldo/saldo-module';

@Injectable({
  providedIn: 'root',
})
export class ServizioSaldo {
  private apiUrl = 'https://bankingapi-production-2687.up.railway.app/';

  private constructor(private http: HttpClient) { }

  private accounts = signal<Account>({
    account_id: 0,
    owner_name: "",
    currency: "",
    createdAt: "",
    balance: 0
  });

  getAccountId(): number {
    return this.accounts().account_id;
  }

  getAccountName(): string {
    return this.accounts().owner_name;
  }

  getAccountBalance(): number {
    return this.accounts().balance;
  }

  getBalance(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/accounts/${accountId}/balance`);
  }

  setAccount(account: Account): void {
    this.accounts.set(account);
    console.log("Account set in service:", this.accounts());
    localStorage.setItem('account', JSON.stringify(account));
  }

  updateNameCurrency(Name: string, Currency: string): void {
    this.accounts.update(acc => ({
      ...acc,
      owner_name: Name,
      currency: Currency
    }));
    localStorage.setItem('account', JSON.stringify(this.accounts()));
  }

  getAccount(): Account {
    return this.accounts();
  }

  createAccount(ownerName: string, currency: string): Observable<Account> {
    const newAccount = {
      owner_name: ownerName,
      currency: currency
    };
    console.log("Creazione account con dati:", newAccount);
    return this.http.post<Account>(`${this.apiUrl}/accounts`, newAccount);
  }

  getTransactions(accountId: string): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.apiUrl}/accounts/${accountId}/transactions`);
  }

  getTransactionById(accountId: string, transactionId: string): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/accounts/${accountId}/transactions/${transactionId}`);
  }

  setDeposit(accountId: string, amount: number, description?: string): Observable<Transactions> {
    const depositData = {
      type: 'deposit',
      amount: amount,
      description: description || ' '
    };
    return this.http.post<Transactions>(`${this.apiUrl}/accounts/${accountId}/deposits`, depositData);
  }

  setWithdrawal(accountId: string, amount: number, description?: string): Observable<Transactions> {
    const withdrawalData = {
      type: 'withdrawal',
      amount: amount,
      description: description || ' '
    };
    return this.http.post<Transactions>(`${this.apiUrl}/accounts/${accountId}/withdrawals`, withdrawalData);
  }
}

