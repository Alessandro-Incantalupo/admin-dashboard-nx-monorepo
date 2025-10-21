import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GitHubProfile } from '@admin-dashboard-nx-monorepo/models';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { GitHubService } from './services/github.service';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss'],
  imports: [BreadcrumbComponent, ButtonComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GitHubProfileComponent {
  private readonly githubService = inject(GitHubService);

  readonly breadcrumbItems = signal<{ label: string; route?: string }[]>([
    { label: 'GitHub Profile', route: '/github-profile' },
  ]);

  readonly username = signal<string>('');
  readonly profile = signal<GitHubProfile | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  fetchProfile() {
    const usernameValue = this.username().trim();
    if (!usernameValue) {
      this.error.set('Please enter a GitHub username');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.profile.set(null);

    this.githubService.getProfile(usernameValue).subscribe({
      next: profile => {
        this.profile.set(profile);
        this.loading.set(false);
      },
      error: err => {
        console.error('Error fetching GitHub profile:', err);
        this.error.set(
          err.error?.error || 'Failed to fetch GitHub profile'
        );
        this.loading.set(false);
      },
    });
  }
}
