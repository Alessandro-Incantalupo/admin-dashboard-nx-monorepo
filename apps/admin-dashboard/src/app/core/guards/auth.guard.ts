import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATHS } from '../constants/routes';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate([PATHS.SIGN_UP]); // Redirect if not logged in
    return false;
  }
  return true; // Allow access if authenticated
};
