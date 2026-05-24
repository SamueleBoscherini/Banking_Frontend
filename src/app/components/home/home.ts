import { Component, computed, signal, Signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { TransactionsList } from '../transactions-list/transactions-list';
import { MatIconModule } from '@angular/material/icon';
import { Account } from '../../model/saldo/saldo-module';


@Component({
  selector: 'app-home',
  imports: [TransactionsList, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(private BankingService: ServizioSaldo) { }

  account: Signal<Account> = computed(() => this.BankingService.getAccount());
  protected isLoading = signal(true);

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
