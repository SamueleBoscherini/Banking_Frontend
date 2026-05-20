import { Component, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-converts',
  imports: [CommonModule],
  templateUrl: './converts.html',
  styleUrl: './converts.scss',
})
export class Converts {

  constructor(
    private BankingService: ServizioSaldo,
  ) { }

  protected currency: string = "EUR";
  protected crypto: string = "BTC";
  protected convertedAmount = signal<string>(" ");

  protected getCurrencies(): string[] {
    return this.BankingService.getCurrencies();
  }

  protected getCryptos(): string[] {
    return this.BankingService.getCrypto();
  }

  protected getSaldo(): number {
    return this.BankingService.getAccountBalance();
  }

  protected convertFiat(currency: string): void {
    this.BankingService.getConvertFiat(this.BankingService.getAccount().account_id.toString(), currency).subscribe({
      next: (response) => {
        this.convertedAmount.set(response.converted_balance.toString());
        console.log("Conversione fiat response:", response.converted_balance.toString());
      },
      error: (err) => {
        alert("Errore durante la conversione. Verifica la valuta e riprova.");
      }
    });
  }
  protected convertCrypto(crypto: string): void {
      this.BankingService.getConvertCrypto(this.BankingService.getAccount().account_id.toString(), crypto).subscribe({
        next: (response) => {
          this.convertedAmount.set(response.converted_amount.toString());
          console.log("Conversione crypto response:", response.converted_amount.toString());
        },
        error: (err) => {
          alert("Errore durante la conversione. Verifica la criptovaluta e riprova.");
        }
      });
    }
}
