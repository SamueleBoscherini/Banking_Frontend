import { Component } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdrawals',
  imports: [FormsModule],
  templateUrl: './withdrawals.html',
  styleUrl: './withdrawals.scss',
})
export class Withdrawals {

  constructor(private BankingService: ServizioSaldo) { };

  saldo(): number {
    return this.BankingService.getAccountBalance();
  }

  importoPrelievo: number = 0;
  descrizionePrelievo: string = '';

  effettuaPrelievo(): void {
    console.log("Importo prelievo:", this.importoPrelievo);
    if (this.importoPrelievo > 0) {
      this.BankingService.setWithdrawal(this.BankingService.getAccountId().toString(), this.importoPrelievo).subscribe({
        next: (transaction) => {
          alert("Prelievo effettuato con successo!");
          this.BankingService.setAccount({
            ...this.BankingService.getAccount(),
            balance: this.BankingService.getAccountBalance() - this.importoPrelievo
          });
          this.importoPrelievo = 0;
          this.descrizionePrelievo = '';
        }
      });
    }
  }
}
