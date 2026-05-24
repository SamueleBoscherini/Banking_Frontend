import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Transactions } from '../model/saldo/saldo-module';

@Injectable({
  providedIn: 'root',
})
export class ServizioSaldo {
  private apiUrl = 'https://bankingapi-production-5dc6.up.railway.app/';

  private currencies: string[] = [
    "AUD",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR"
  ]

  private crypto: string[] = [
    "BTC",
    "ETH",
    "SOL",
    "BNB",
    "XRP",
    "ADA",
    "DOT",
    "DOGE",
    "USDT",
  ]

  private constructor(private http: HttpClient) { }

  getCurrencies(): string[] {
    return this.currencies;
  }

  getCrypto(): string[] {
    return this.crypto;
  }

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
    localStorage.setItem('account', JSON.stringify(account));
  }

  updateAccount(Name: string, Currency: string,AccountId: string): void {
    console.log(AccountId);
    this.accounts.update(acc => ({
      ...acc,
      account_id: Number(AccountId),
      owner_name: Name,
      currency: Currency
    }));
    console.log("Account aggiornato in servizio:", this.accounts());
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

  getConvertFiat(accountId: string, Currency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}accounts/${accountId}/balance/convert/fiat?to=${Currency}`);
  }

  getConvertCrypto(accountId: string, Currency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}accounts/${accountId}/balance/convert/crypto?to=${Currency}`);
  }
}

