import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Deposits } from './components/deposits/deposits';
import { Withdrawals } from './components/withdrawals/withdrawals';
import { Converts } from './components/converts/converts';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import {Graphics} from './components/graphics/graphics';
import {Option} from './components/option/option'


export const routes: Routes = [
  { path: 'login', component: Login, data: { animation: 'Login' } },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: Home, data: { animation: 'Home' } },
      { path: 'deposits', component: Deposits, data: { animation: 'Deposits' } },
      { path: 'prelievo', component: Withdrawals, data: { animation: 'Withdrawals' } },
      { path: 'convert', component: Converts, data: { animation: 'Converts' } },
      { path: 'graphics', component: Graphics, data: { animation: 'Graphics' } },
      { path: 'option', component: Option, data: { animation: 'Option' } },
    ],
  },
];
