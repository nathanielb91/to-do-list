import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser: User | null = null;

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    // User logs in as admin or generic user
    if (username === 'admin' && password === 'password') {
      this.currentUser = { username, role: 'admin' };
      this.isAuthenticated.next(true);
      return of(true);
    } else if (username === 'user' && password === 'password') {
        this.currentUser = { username, role: 'user' };
        this.isAuthenticated.next(true);
        return of(true);
    }
    return of(false);
  }

  logout() {
    this.isAuthenticated.next(false);
    this.currentUser = null;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get userRole(): 'admin' | 'user' | null {
    return this.currentUser?.role || null;
  }

  get currentUsername(): string | null {
    return this.currentUser?.username || null;
  }

}
