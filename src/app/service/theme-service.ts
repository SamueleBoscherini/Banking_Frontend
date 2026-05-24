import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  private darkMode = signal<boolean>(true);
  private defaultImgUrl = 'https://ui-avatars.com/api/?name=Utente&background=22d3a0&color=fff&size=80';

  readonly isDark = this.darkMode.asReadonly();

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'light') {
      this.darkMode.set(false);
    }
    this.applyTheme();
  }

  toggle(): void {
    this.darkMode.update(v => !v);
    this.applyTheme();
  }

  private applyTheme(): void {
    const dark = this.darkMode();
    document.documentElement.classList.toggle('light-theme', !dark);
    localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
  }

  private getAvatarKey(): string {
    const stored = localStorage.getItem('account');
    if (stored) {
      try {
        const account = JSON.parse(stored);
        if (account.account_id) {
          return `avatar_${account.account_id}`;
        }
      } catch {}
    }
    return 'avatar_default';
  }

  getImgUrl(): string {
    return localStorage.getItem(this.getAvatarKey()) || this.defaultImgUrl;
  }

  setImgUrl(url: string): void {
    localStorage.setItem(this.getAvatarKey(), url);
  }
}
