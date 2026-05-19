import { Component } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';

@Component({
  selector: 'app-home',
  imports: [],
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
}
