import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'user' && password === 'password') {
        this.isAuthenticated.next(true);
        return of(true);
    }
    return of(false);
  }

  logout() {
    this.isAuthenticated.next(false);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

}
