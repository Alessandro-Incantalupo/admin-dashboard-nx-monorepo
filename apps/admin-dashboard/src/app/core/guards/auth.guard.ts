import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityStore } from '@core/state/security-store';
import { PATHS } from '../constants/routes';

export const AuthGuard: CanActivateFn = () => {
  const securityStore = inject(SecurityStore);

  const router = inject(Router);

  if (!securityStore.signedIn()) {
    router.navigate([PATHS.SIGN_UP]); // Redirect if not logged in
    return false;
  }
  return true; // Allow access if authenticated
};
