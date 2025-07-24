import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from '@core/constants/routes';
import { AuthService } from '@core/services/auth.service';
import { ThemeStore } from '@core/state/theme.store';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { SvgIconComponent } from 'angular-svg-icon';
@Component({
  selector: 'app-profile-menu',
  imports: [SvgIconComponent, ClickOutsideDirective],
  templateUrl: './profile-menu.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  themeStore = inject(ThemeStore);
  authService = inject(AuthService);
  router = inject(Router);

  public isOpen = signal(false);

  public profileMenu = [
    {
      title: 'Your Profile',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: PATHS.PROFILE,
    },
    {
      title: 'Settings',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
      link: PATHS.SETTINGS,
    },
    {
      title: 'Log out',
      icon: './assets/icons/heroicons/outline/logout.svg',
      link: PATHS.AUTH,
    },
  ];

  public toggleMenu(): void {
    this.isOpen.set(!this.isOpen());
  }

  logout() {
    this.isOpen.set(false);
    this.authService.logout();
  }

  signIn() {
    this.router.navigate([PATHS.AUTH, PATHS.SIGN_IN]);
  }

  toProfile(link: string) {
    const userData = this.authService.userData(); // Get the user object
    const userRole = userData?.role || 'Guest'; // Extract the user role
    this.router.navigate([PATHS.PROFILE, userRole], {
      state: { userData: this.authService.userData() },
    });
  }
}
