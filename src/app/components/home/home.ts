import { Component, computed, Signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { TransactionsList } from '../transactions-list/transactions-list';
import { Account } from '../../model/saldo/saldo-module';

@Component({
  selector: 'app-home',
  imports: [TransactionsList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(private BankingService: ServizioSaldo) { }

  account: Signal<Account> = computed(() => this.BankingService.getAccount());

  getAccountName(): string {
    return this.account().owner_name;
  }

  getAccountBalance(): number {
    return this.account().balance;
  }

  getAccountCurrency(): string {
    return this.account().currency;
  }
}
