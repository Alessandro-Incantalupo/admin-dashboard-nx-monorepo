import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'token';
  readonly isAuthenticated = signal(!!localStorage.getItem(this.tokenKey));
  readonly userData = signal(this.decodeUserFromToken());
  readonly error = signal<string | null>(null);
  readonly loginStatus = signal<'idle' | 'success' | 'error'>('idle');

  readonly login = rxMethod<{ email: string; password: string }>(input$ =>
    input$.pipe(
      tap(() => {
        this.error.set(null);
        this.loginStatus.set('idle');
      }),
      switchMap(({ email, password }) =>
        this.http
          .post<{ token: string }>('http://localhost:3000/auth/login', {
            email,
            password,
          })
          .pipe(
            tapResponse({
              next: ({ token }) => {
                localStorage.setItem(this.tokenKey, token);
                this.userData.set(this.decodeUserFromToken());
                this.isAuthenticated.set(true);
                this.loginStatus.set('success');
              },
              error: () => {
                this.logout();
                this.error.set('Login failed');
                this.loginStatus.set('error');
              },
            })
          )
      )
    )
  );

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.set(false);
    this.userData.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private decodeUserFromToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
