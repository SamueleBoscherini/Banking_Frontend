import { Component, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-deposits',
  imports: [FormsModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './deposits.html',
  styleUrl: './deposits.scss',
})
export class Deposits {

  constructor(
    private BankingService: ServizioSaldo,
    private snackBar: MatSnackBar
  ) { };

  protected isLoading = signal(false);

  saldo(): number {
    return this.BankingService.getAccountBalance();
  }

  importoDeposito: number = 0;
  descrizioneDeposito: string = '';

  effettuaDeposito(): void {
    if (this.importoDeposito <= 0) {
      this.snackBar.open('Inserisci un importo valido', 'Chiudi', { duration: 3000 });
      return;
    }
    this.isLoading.set(true);
    this.BankingService.setDeposit(this.BankingService.getAccountId().toString(), this.importoDeposito, this.descrizioneDeposito).subscribe({
      next: () => {
        this.snackBar.open('Deposito effettuato con successo!', 'Chiudi', { duration: 3000 });
        this.BankingService.setAccount({
          ...this.BankingService.getAccount(),
          balance: this.BankingService.getAccountBalance() + this.importoDeposito
        });
        this.importoDeposito = 0;
        this.descrizioneDeposito = '';
        this.isLoading.set(false);
      },
      error: () => {
        this.snackBar.open('Errore durante il deposito. Riprova.', 'Chiudi', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }
}
