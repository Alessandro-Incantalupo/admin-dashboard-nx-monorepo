import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private userDataKey = 'userData';

  isAuthenticated = signal(!!localStorage.getItem(this.tokenKey));
  userData = signal(this.getUserData()); // Reactive user data

  login(email: string, password: string) {
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData = { email, role: 'admin', username: 'Alessandro Incantalupo' };
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      localStorage.setItem(this.userDataKey, JSON.stringify(userData));
      this.isAuthenticated.set(true);
      this.userData.set(userData);
      return true;
    } else if (email === 'user@example.com' && password === 'user123') {
      const userData = { email, role: 'user', username: 'RegularUser' };
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      localStorage.setItem(this.userDataKey, JSON.stringify(userData));
      this.isAuthenticated.set(true);
      this.userData.set(userData);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDataKey);
    this.isAuthenticated.set(false);
    this.userData.set(null);
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem(this.userDataKey) || 'null');
  }
}
