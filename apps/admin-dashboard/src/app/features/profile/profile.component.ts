import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthStore } from '@core/state/auth.store';
import { SecurityStore } from '@core/state/security-store';
import { ThemeStore } from '@core/state/theme.store';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../shared/button/button.component';
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
  providers: [AuthStore],
})
export default class ProfileComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  themeStore = inject(ThemeStore);
  securityStore = inject(SecurityStore);

  breadcrumbItems = signal<{ label: string; route?: string }[]>([]);

  state = this.router.getCurrentNavigation()?.extras.state;
  userData: { [key: string]: any } | undefined = undefined;

  constructor() {
    // Get user data from state
    this.userData = this.state?.['userData'];
    // Get username from route parameters
    this.route.params.subscribe(params => {
      const currentUsername = this.userData?.['name'] || 'Name Not Found';
      // ✅ Update breadcrumbs dynamically
      this.breadcrumbItems.set([
        { label: 'Profile', route: `/profile/${currentUsername}` },
      ]);
    });
  }
}
