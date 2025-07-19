import { User } from '@admin-dashboard-nx-monorepo/models';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectBaseUrl } from '@core/CIF/inject-base-url';
import { BYPASS_LOADING_SPINNER } from '@core/interceptors/loading.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly createUrlRemote = injectBaseUrl();

  private readonly usersUrl = this.createUrlRemote(`/users`, () => `/users`);
  private readonly RESET_USERS_HTTP_CONTEXT = new HttpContext().set(
    BYPASS_LOADING_SPINNER,
    true
  );

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }

  addUser(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`);
  }

  resetDemoData() {
    return this.http.post<void>(
      this.usersUrl + '/reset',
      {},
      { context: this.RESET_USERS_HTTP_CONTEXT }
    );
  }
}
