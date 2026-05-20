import { Component, effect, Signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { Transactions } from '../../model/saldo/saldo-module';
import {Transaction} from '../transaction/transaction';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  imports: [Transaction,CommonModule],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList {

  transazioni: Signal<Transactions[]>;

   constructor(private BankingService: ServizioSaldo){
    console.log("accountId in transactions-list:", this.BankingService.getAccountId());
    const accountId = this.BankingService.getAccountId().toString();
    this.transazioni = toSignal(this.BankingService.getTransactions(accountId).pipe(
      map((response: any) => response.transactions)
    ), { initialValue: [{
      id: 0,
      accountId: 0,
      type: "",
      amount: 0,
      description: "",
      balanceAfter: 0,
      date: ""
     }] });
    effect(() => {
      console.log("Valore attuale di transazioni:", this.transazioni());
    });

  };


  
}
