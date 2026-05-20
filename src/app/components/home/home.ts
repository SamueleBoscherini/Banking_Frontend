import { Component } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { TransactionsList } from '../transactions-list/transactions-list';

@Component({
  selector: 'app-home',
  imports: [TransactionsList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
  constructor(private BankingService: ServizioSaldo) { }

  getAccountName(): string {
    return this.BankingService.getAccountName();
  }

  getAccountBalance(): number {
    return this.BankingService.getAccountBalance();
  }

  getAccountCurrency(): string {
    return this.BankingService.getAccountCurrency();
  }
}
