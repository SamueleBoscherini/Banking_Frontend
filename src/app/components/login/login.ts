import { Component, Signal, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { AuthService } from '../../service/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(
    private BankingService: ServizioSaldo,
    private AuthService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  protected isLoading = signal(false);

  protected getCurrencies(): string[] {
    return this.BankingService.getCurrencies();
  }


  protected account = signal({
    id: 0,
    name: "",
    currency: "EUR",
    createdAt: ""
  });

  protected readonly showCreateAccount = signal(false);

  protected toggleCreateAccount(): void {
    this.showCreateAccount.update(v => !v);
  }

  protected enterAccount(): void {
    if (this.account().id <= 0) {
      this.snackBar.open('Inserisci un ID valido', 'Chiudi', { duration: 3000 });
      return;
    }

    this.isLoading.set(true);
    this.BankingService.getBalance(this.account().id.toString()).subscribe({
      next: (account) => {
        this.AuthService.login();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.snackBar.open('Errore durante il recupero del saldo. Verifica l\'ID e riprova.', 'Chiudi', { duration: 4000 });
        this.isLoading.set(false);
      }
    });


  }

  protected createAccount(): void {
    if (!this.account().name || !this.account().currency) {
      this.snackBar.open('Tutti i campi sono obbligatori.', 'Chiudi', { duration: 3000 });
      return;
    }

    this.isLoading.set(true);
    this.BankingService.createAccount(this.account().name, this.account().currency).subscribe({
      next: (account) => {
        this.BankingService.updateAccountInt(this.account().name, this.account().currency, (account as any).accountId);
        this.AuthService.login();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.snackBar.open('Errore durante la creazione dell\'account. Riprova.', 'Chiudi', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }
}
