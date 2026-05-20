import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Deposits } from './components/deposits/deposits';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'deposits', component: Deposits }
    ],
  },
];
