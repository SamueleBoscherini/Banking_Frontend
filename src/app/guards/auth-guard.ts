import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { ServizioSaldo } from '../service/servizio-saldo';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const BankingService = inject(ServizioSaldo);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    BankingService.setAccount(JSON.parse(localStorage.getItem('account') || '{}'));
    return true;
  }

  router.navigate(['/login']);
  return false;
};