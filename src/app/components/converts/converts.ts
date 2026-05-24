import { Component, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-converts',
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './converts.html',
  styleUrl: './converts.scss',
})
export class Converts {

  constructor(
    private BankingService: ServizioSaldo,
    private snackBar: MatSnackBar
  ) { }

  protected isLoading = signal(false);
  protected currency: string = "EUR";
  protected crypto: string = "BTC";
  protected convertedAmount = signal<string>("0.00");

  protected getCurrencies(): string[] {
    return this.BankingService.getCurrencies();
  }

  protected getCurrency(): string {
    return this.BankingService.getAccount().currency;
  }

  protected getCryptos(): string[] {
    return this.BankingService.getCrypto();
  }

  protected getSaldo(): number {
    return this.BankingService.getAccountBalance();
  }

  protected convertFiat(currency: string): void {
    this.isLoading.set(true);
    this.BankingService.getConvertFiat(this.BankingService.getAccount().account_id.toString(), currency).subscribe({
      next: (response) => {
        this.convertedAmount.set(response.converted_balance.toString());
        this.isLoading.set(false);
      },
      error: () => {
        this.snackBar.open('Errore durante la conversione. Verifica la valuta e riprova.', 'Chiudi', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }
  protected convertCrypto(crypto: string): void {
    this.isLoading.set(true);
      this.BankingService.getConvertCrypto(this.BankingService.getAccount().account_id.toString(), crypto).subscribe({
        next: (response) => {
          this.convertedAmount.set(response.converted_amount.toString());
          this.isLoading.set(false);
        },
        error: () => {
          this.snackBar.open('Errore durante la conversione. Verifica la criptovaluta e riprova.', 'Chiudi', { duration: 3000 });
          this.isLoading.set(false);
        }
      });
    }
}
