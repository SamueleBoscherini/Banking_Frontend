import { Component, Signal, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { FormsModule } from '@angular/forms';
import { Account } from '../../model/saldo/saldo-module';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private BankingService: ServizioSaldo) { }


  protected account: Account = {
    id: 0,
    name: "",
    currency: "",
    createdAt: ""
  };

  protected readonly showCreateAccount = signal(false);

  protected toggleCreateAccount(): void {
    this.showCreateAccount.update(v => !v);
  }

  protected enterAccount(): void {
      if(this.account.id<=0){
        alert("Id non valido");
        return;
      }

      this.BankingService.getBalance(this.account.id.toString()).subscribe({
        next: (data) => {
          this.BankingService.accounts.set(data);
          console.log(this.BankingService.accounts());
        },
        error: (err) => {
          alert("Account non trovato");
          console.error(err);
        }
      });
  
  }
}
