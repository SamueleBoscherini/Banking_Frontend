import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../service/auth-service';
import { ThemeService } from '../../service/theme-service';
import { Router } from '@angular/router';
import { routeAnimations } from '../../route-animations';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  animations: [routeAnimations],
})
export class Navbar {
  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  logout(): void {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  getRouteAnimationState(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['animation'] ?? '';
  }
}
