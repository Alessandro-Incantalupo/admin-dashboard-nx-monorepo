import { GitHubProfile } from '@admin-dashboard-nx-monorepo/models';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectBaseUrl } from '@core/CIF/inject-base-url';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly createUrlRemote = injectBaseUrl();

  private readonly githubUrl = this.createUrlRemote(
    `/github`,
    () => `/github`
  );

  getProfile(username: string) {
    return this.http.get<GitHubProfile>(
      `${this.githubUrl}/profile/${username}`
    );
  }
}
