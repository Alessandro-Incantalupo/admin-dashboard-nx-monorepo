import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectBaseUrl } from '@core/CIF/inject-base-url';
import { map } from 'rxjs';
import { User, UsersResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly createUrlRemote = injectBaseUrl();

  private readonly usersUrl = this.createUrlRemote(
    '/mocks/Users.json',
    () => `/users`
  );

  getUsers() {
    return this.http
      .get<UsersResponse>(this.usersUrl)
      .pipe(map(response => response.data));
  }

  addUser(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.usersUrl}/${userId}`);
  }
}
