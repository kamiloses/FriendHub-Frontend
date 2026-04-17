import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEnvironmentVariables {

  private globalSessionSubject = new BehaviorSubject<boolean>(false);
  private globalUsernameSubject = new BehaviorSubject<string | null>(null);
  private globalTokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.initializeState();
  }

  private initializeState(): void {
    const storedSession = localStorage.getItem('globalSession') === 'true';
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    this.globalSessionSubject.next(storedSession);
    this.globalUsernameSubject.next(storedUsername);
    this.globalTokenSubject.next(storedToken);
  }

  getGlobalSession$() {
    return this.globalSessionSubject.asObservable();
  }

  getGlobalSession(): boolean {
    return this.globalSessionSubject.getValue();
  }

  setGlobalSession(value: boolean): void {
    this.globalSessionSubject.next(value);
    localStorage.setItem('globalSession', String(value));
  }

  getGlobalUsername$() {
    return this.globalUsernameSubject.asObservable();
  }

  getGlobalUsernameValue(): string | null {
    return this.globalUsernameSubject.getValue();
  }

  setGlobalUsername(value: string | null): void {
    this.globalUsernameSubject.next(value);

    if (value) {
      localStorage.setItem('username', value);
    } else {
      localStorage.removeItem('username');
    }
  }

  getGlobalToken$() {
    return this.globalTokenSubject.asObservable();
  }

  getGlobalToken(): string | null {
    return this.globalTokenSubject.getValue();
  }

  setGlobalToken(value: string | null): void {
    this.globalTokenSubject.next(value);

    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  clear(): void {
    this.globalSessionSubject.next(false);
    this.globalUsernameSubject.next(null);
    this.globalTokenSubject.next(null);

    localStorage.removeItem('globalSession');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
