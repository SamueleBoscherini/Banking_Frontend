import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected readonly showCreateAccount = signal(false);

  protected toggleCreateAccount(): void {
    this.showCreateAccount.update(v => !v);
  }
}
