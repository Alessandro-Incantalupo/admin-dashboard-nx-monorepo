import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap } from 'rxjs';

type UserRole = 'guest' | 'user' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'token';

  readonly isAuthenticated = signal(!!localStorage.getItem(this.tokenKey));
  readonly userData = signal(this.decodeUserFromToken());
  readonly error = signal<string | null>(null);
  readonly loginStatus = signal<'idle' | 'success' | 'error'>('idle');
  readonly currentRole = signal<UserRole>(this.getInitialRole());

  readonly isGuest = computed(() => this.currentRole() === 'guest');
  readonly isUser = computed(
    () => this.currentRole() === 'user' && this.isAuthenticated()
  );
  readonly isAdmin = computed(
    () => this.currentRole() === 'admin' && this.isAuthenticated()
  );

  readonly canCreate = computed(() => this.isAdmin());
  readonly canEdit = computed(
    () => (this.isUser() || this.isAdmin()) && this.isAuthenticated()
  );
  readonly canDelete = computed(() => this.isAdmin());
  readonly canView = computed(() => this.isAuthenticated() || this.isGuest());

  readonly login = rxMethod<{ email: string; password: string }>(input$ =>
    input$.pipe(
      tap(() => {
        this.error.set(null);
        this.loginStatus.set('idle');
      }),
      switchMap(({ email, password }) =>
        this.http
          .post<{ token: string }>(environment.baseUrl + '/auth/login', {
            email,
            password,
          })
          .pipe(
            tapResponse({
              next: ({ token }) => {
                localStorage.setItem(this.tokenKey, token);
                const userData = this.decodeUserFromToken();
                this.userData.set(userData);
                this.isAuthenticated.set(true);

                if (userData?.role) {
                  this.currentRole.set(userData.role);
                }

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
    this.currentRole.set('guest');
    this.loginStatus.set('idle');
    this.error.set(null);
  }

  setRole(role: UserRole) {
    if (!this.isAuthenticated() && role !== 'guest') {
      this.error.set('Please login to access this role');
      return;
    }

    const userData = this.userData();
    const actualUserRole = userData?.role;

    if (role === 'admin' && actualUserRole !== 'admin') {
      this.error.set('You do not have admin privileges');
      return;
    }

    if (role === 'user' && !['user', 'admin'].includes(actualUserRole)) {
      this.error.set('You do not have user privileges');
      return;
    }

    this.currentRole.set(role);
    this.error.set(null);
  }

  getRoleDescription() {
    if (!this.isAuthenticated() && !this.isGuest()) {
      return 'Please login to access user features.';
    }

    const roleDescriptions = {
      guest:
        'As a guest, you can only view limited content. Login for full access.',
      user: 'As a user, you can view and edit content.',
      admin:
        'As an admin, you have full access to create, edit, and delete content.',
    } as const;

    return roleDescriptions[this.currentRole()];
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getInitialRole(): UserRole {
    const token = this.getToken();
    if (!token) return 'guest';

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.role ?? 'guest';
    } catch {
      return 'guest';
    }
  }

  private decodeUserFromToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch {
      return null;
    }
  }
}
