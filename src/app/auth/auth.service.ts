import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);

  loggedIn$ = this.loggedIn.asObservable();
  username$ = this.username.asObservable();

  constructor() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.loggedIn.next(true);
      const payload = this.parseJwt(token);
      this.username.next(payload?.sub || null);
    }
  }

  login(token: string) {
    localStorage.setItem('auth_token', token);
    this.loggedIn.next(true);
    const payload = this.parseJwt(token);
    this.username.next(payload?.sub || null);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn.next(false);
    this.username.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getUsername(): string | null {
    return this.username.value;
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}
