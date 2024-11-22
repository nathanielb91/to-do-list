import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Nathaniel Bass Coding Assessment';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedInStatus) => {
      // this.isLoggedIn = loggedInStatus;
      this.isLoggedIn = true;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
