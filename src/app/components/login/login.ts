import { Component, Signal, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { AuthService } from '../../service/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(
    private BankingService: ServizioSaldo,
    private AuthService: AuthService,
    private router: Router
  ) { }


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
      alert("Id non valido");
      return;
    }

    this.BankingService.getBalance(this.account().id.toString()).subscribe({
      next: (account) => {
        this.BankingService.setAccount(account);
        this.AuthService.login();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert("Errore durante il recupero del saldo. Verifica l'ID e riprova.");
      }
    });


  }

  protected createAccount(): void {
    if (!this.account().name || !this.account().currency) {
      alert("Tutti i campi sono obbligatori.");
      return;
    }

    this.BankingService.createAccount(this.account().name, this.account().currency).subscribe({
      next: (account) => {
        this.BankingService.updateNameCurrency(this.account().name, this.account().currency);
        this.AuthService.login();
        this.router.navigate(['/home']);
      }
    });
    alert("Account creato con successo! Ora puoi accedere con l'ID dell'account.");
    this.toggleCreateAccount();
  }
}
