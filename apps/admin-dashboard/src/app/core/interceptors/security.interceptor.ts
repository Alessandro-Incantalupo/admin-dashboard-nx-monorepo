import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SecurityStore } from '@core/state/security-store';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  const securityStore = inject(SecurityStore);
  const bearer = securityStore.token();

  if (!bearer) {
    return next(req);
  }

  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${bearer}`),
    })
  );
};
