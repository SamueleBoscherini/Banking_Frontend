import { Component, Input } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { Transactions } from '../../model/saldo/saldo-module';

@Component({
  selector: 'app-transaction',
  imports: [],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss',
})
export class Transaction {

  @Input() transazione!: Transactions;
  @Input() num!: number;

  constructor(private BankingService: ServizioSaldo) { };

  protected date(): string {
    return this.transazione.created_at.split('.')[0].replace('T', ' ');
  }


}
