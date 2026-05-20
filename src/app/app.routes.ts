import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Deposits } from './components/deposits/deposits';
import { Withdrawals } from './components/withdrawals/withdrawals';
import { Converts } from './components/converts/converts';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { C } from '@angular/cdk/keycodes';


export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'deposits', component: Deposits },
      { path: 'prelievo', component: Withdrawals },
      { path: 'convert', component: Converts }
    ],
  },
];
