import { Component, Input } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { Transactions } from '../../model/saldo/saldo-module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction',
  imports: [MatIconModule],
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
