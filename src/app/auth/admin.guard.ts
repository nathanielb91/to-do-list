import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userRole !== 'admin') {
    router.navigate(['/todo']); // Redirect non-admin users
    return false;
  }

  return true;
};
