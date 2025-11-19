import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../post-list/user.model';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsResolver implements Resolve<User[]> {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  resolve(): Observable<User[]> {
    const username = this.auth.getUsername();

    if (!username) {
      console.warn("Brak username — resolver zwraca pustą listę");
      return of([]);
    }

    return this.http
      .get<User[]>(`http://localhost:8084/api/friends?username=${username}`)
      .pipe(
        catchError(err => {
          console.error("Błąd resolvera:", err);
          return of([]);
        })
      );
  }
}
