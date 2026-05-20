import { Component } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-deposits',
  imports: [FormsModule],
  templateUrl: './deposits.html',
  styleUrl: './deposits.scss',
})
export class Deposits {

  constructor(private BankingService: ServizioSaldo) { };

  saldo(): number {
    return this.BankingService.getAccountBalance();
  }

  importoDeposito: number = 0;
  descrizioneDeposito: string = '';

  effettuaDeposito(): void {
    console.log("Importo deposito:", this.importoDeposito);
    if (this.importoDeposito > 0) {
      this.BankingService.setDeposit(this.BankingService.getAccountId().toString(), this.importoDeposito).subscribe({
        next: (transaction) => {
          alert("Deposito effettuato con successo!");
          this.BankingService.setAccount({
            ...this.BankingService.getAccount(),
            balance: this.BankingService.getAccountBalance() + this.importoDeposito
          });
          this.importoDeposito = 0;
          this.descrizioneDeposito = '';
        }
      });
    }
  }
}
