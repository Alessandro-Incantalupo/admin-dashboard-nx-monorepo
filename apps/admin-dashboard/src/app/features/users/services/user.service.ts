import { User } from '@admin-dashboard-nx-monorepo/models';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectBaseUrl } from '@core/CIF/inject-base-url';
import { WHITELISTED_API } from '@core/interceptors/base-response.interceptor';
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

  getUsers(page: number = 1, size: number = 5) {
    const context = new HttpContext().set(WHITELISTED_API, true);
    return this.http.get<{
      data: User[];
      meta: { totalUsers: number; totalPages: number };
    }>(`${this.usersUrl}?page=${page}&size=${size}`, { context });
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
