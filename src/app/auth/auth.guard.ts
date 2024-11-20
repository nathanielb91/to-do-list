import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { first, map } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard triggered'); // Debug log

  // Use the observable and return a boolean
  return authService.isLoggedIn.pipe(
    first(), // Complete the observable after the first value
    map((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('User is logged in');
        return true; // Allow access
      } else {
        console.log('User is NOT logged in, redirecting to login');
        router.navigate(['/login']);
        return false; // Deny access
      }
    })
  );
};