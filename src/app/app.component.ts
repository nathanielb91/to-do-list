import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
