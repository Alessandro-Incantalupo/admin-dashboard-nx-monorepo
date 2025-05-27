import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { AuthService } from '../auth/services/auth.service';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
  imports: [
    ButtonComponent,
    RouterLink,
    BreadcrumbComponent,
    ThemeSelectorComponent,
    ProfileInfoComponent,
  ],
})
export default class ProfileComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  breadcrumbItems = signal<{ label: string; route?: string }[]>([]);

  state = this.router.getCurrentNavigation()?.extras.state;
  userData: { [key: string]: any } | undefined = undefined;
  username = signal('Guest');
  userRole = signal('Guest');

  constructor() {
    // Get user data from state
    this.userData = this.state?.['userData'];
    this.userRole.set(this.userData?.['role']);

    // Get username from route parameters
    this.route.params.subscribe(params => {
      const currentUsername = params['username'] || this.username();
      this.username.set(currentUsername);

      // ✅ Update breadcrumbs dynamically
      this.breadcrumbItems.set([
        { label: 'Profile', route: `/profile/${currentUsername}` },
      ]);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
