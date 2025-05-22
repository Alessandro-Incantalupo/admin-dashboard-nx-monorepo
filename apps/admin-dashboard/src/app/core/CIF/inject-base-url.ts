import { assertInInjectionContext, inject } from '@angular/core';
import { BASE_URL } from '@core/providers/base-url';
import { environment } from '@environments/environment';

export const injectBaseUrl = () => {
  assertInInjectionContext(injectBaseUrl);
  const baseUrl = inject(BASE_URL);
  return (mockUrl: string, prodUrl: string | (() => string)): string => {
    if (typeof prodUrl === 'string') {
      return (
        baseUrl + `${environment.mode === 'development' ? mockUrl : prodUrl}`
      );
    }
    const currProdUrl = prodUrl();
    return (
      baseUrl + `${environment.mode === 'development' ? mockUrl : currProdUrl}`
    );
  };
};
