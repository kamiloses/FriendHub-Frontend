import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

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

  private initializeState() {
    const storedSession = sessionStorage.getItem('globalSession') === 'true';
    const storedUsername = sessionStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    this.globalSessionSubject.next(storedSession);
    this.globalUsernameSubject.next(storedUsername);
    this.globalTokenSubject.next(storedToken);
  }

  getGlobalSession$() {
    return this.globalSessionSubject.asObservable();
  }

  setGlobalSession(value: boolean) {
    this.globalSessionSubject.next(value);
    sessionStorage.setItem('globalSession', value.toString());
  }

  getGlobalUsername$() {
    return this.globalUsernameSubject.asObservable();
  }

  getGlobalUsernameValue(): string | null {
    return this.globalUsernameSubject.getValue();
  }

  setGlobalUsername(value: string | null) {
    this.globalUsernameSubject.next(value);
    if (value) {
      sessionStorage.setItem('username', value);
    } else {
      sessionStorage.removeItem('username');
    }
  }

  getGlobalToken$() {
    return this.globalTokenSubject.asObservable();
  }

  setGlobalToken(value: string | null) {
    this.globalTokenSubject.next(value);
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }
}
