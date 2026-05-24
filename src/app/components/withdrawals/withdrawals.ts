import { Component, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-withdrawals',
  imports: [FormsModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './withdrawals.html',
  styleUrl: './withdrawals.scss',
})
export class Withdrawals {

  constructor(
    private BankingService: ServizioSaldo,
    private snackBar: MatSnackBar
  ) { };

  protected isLoading = signal(false);

  saldo(): number {
    return this.BankingService.getAccountBalance();
  }

  importoPrelievo: number = 0;
  descrizionePrelievo: string = '';

  effettuaPrelievo(): void {
    if (this.importoPrelievo <= 0) {
      this.snackBar.open('Inserisci un importo valido', 'Chiudi', { duration: 3000 });
      return;
    }
    this.isLoading.set(true);
    this.BankingService.setWithdrawal(this.BankingService.getAccountId().toString(), this.importoPrelievo, this.descrizionePrelievo).subscribe({
      next: () => {
        this.snackBar.open('Prelievo effettuato con successo!', 'Chiudi', { duration: 3000 });
        this.BankingService.setAccount({
          ...this.BankingService.getAccount(),
          balance: this.BankingService.getAccountBalance() - this.importoPrelievo
        });
        this.importoPrelievo = 0;
        this.descrizionePrelievo = '';
        this.isLoading.set(false);
      },
      error: () => {
        this.snackBar.open('Errore durante il prelievo. Riprova.', 'Chiudi', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }
}
