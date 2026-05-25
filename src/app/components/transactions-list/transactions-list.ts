import { Component, effect, signal, Signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { Transactions } from '../../model/saldo/saldo-module';
import { Transaction } from '../transaction/transaction';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { map, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-transactions-list',
  imports: [Transaction, CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList {
  protected isLoading = signal(true);
  protected max = 5;
  protected min = 0;
  protected qta = 1;

  transazioni: Signal<Transactions[]>;
  save!: Signal<Transactions[]>;

  constructor(private BankingService: ServizioSaldo) {
    console.log("accountId in transactions-list:", this.BankingService.getAccountId());
    const accountId = this.BankingService.getAccountId().toString();
    this.transazioni = toSignal(this.BankingService.getTransactions(accountId).pipe(
      map((response: any) => response.transactions),
      tap(() => console.log("Transazioni ricevute:", this.transazioni())),
      tap(() => this.isLoading.set(false)),
    ), {
      initialValue: [{
        id: 0,
        accountId: 0,
        type: "",
        amount: 0,
        description: "",
        balanceAfter: 0,
        created_at: ""
      }]
    });
  };

  protected go(): void {
    if (this.min + 5 < this.transazioni().length) {
      this.max += 5;
      this.min += 5;
      this.qta += 1;
    }
  }

  protected back(): void {
    if (this.min > 0) {
      this.max -= 5;
      this.min -= 5;
      this.qta -= 1;
    }
  }

  protected deposito(): void {
    if (this.save === undefined) {
      this.save = this.transazioni;
    } else {
      this.transazioni = this.save;
    }

    this.transazioni = signal<Transactions[]>(this.transazioni().filter(t => t.type == "deposit"));
  }

  protected prelievo(): void {
    if (this.save === undefined) {
      this.save = this.transazioni;
    } else {
      this.transazioni = this.save;
    }

    this.transazioni = signal<Transactions[]>(this.transazioni().filter(t => t.type == "withdrawal"));
  }

  protected tutti(): void {
    this.transazioni = this.save;
  }


}
