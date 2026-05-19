import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(): void {
    localStorage.setItem('token', 'loged_in');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
  }

}