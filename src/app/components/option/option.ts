import { Component, signal } from '@angular/core';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { Router } from '@angular/router';
import { Account } from '../../model/saldo/saldo-module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ThemeService } from '../../service/theme-service';

@Component({
  selector: 'app-option',
  imports: [FormsModule, MatIconModule, MatSnackBarModule, DatePipe],
  templateUrl: './option.html',
  styleUrl: './option.scss',
})
export class Option {
  
  protected account = signal<Account>({
    account_id: 0,
    owner_name: "",
    currency: "",
    created_at: "",
    balance: 0
  });
  protected imageUrl: string = "";

  constructor(
    private BankingService: ServizioSaldo,
    private router: Router,
    protected themeService: ThemeService,
    private snackBar: MatSnackBar,
  ){
    this.account.set(BankingService.getAccount());
  }

  protected updateName(){
    this.BankingService.updateAccount(this.account().account_id.toString(),this.account().owner_name).subscribe();
    this.BankingService.updateAccountInt(this.account().owner_name,this.account().currency,this.account().account_id.toString())
    this.snackBar.open('Account aggiornato con successo', 'Chiudi', { duration: 3000 });
  }

  protected delete(){
    this.BankingService.deleteAccount(this.account().account_id.toString()).subscribe({
      next: () => {
        this.snackBar.open('Account eliminato. Reindirizzamento...', 'Chiudi', { duration: 4000 });
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
    });
  }

  protected toggleTheme(){
    this.themeService.toggle();
  }

  protected changeImg(){
    this.themeService.setImgUrl(this.imageUrl)
    this.snackBar.open('Immagine profilo aggiornata', 'Chiudi', { duration: 3000 });
  }
}
