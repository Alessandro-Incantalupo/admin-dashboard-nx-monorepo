import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PATHS } from '@core/constants/routes';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@features/auth/services/auth.service';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { SvgIconComponent } from 'angular-svg-icon';
@Component({
  selector: 'app-profile-menu',
  imports: [NgClass, SvgIconComponent, RouterLink, ClickOutsideDirective],
  templateUrl: './profile-menu.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  public isOpen = false;
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

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleThemeMode() {
    this.themeService.theme.update(theme => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update(theme => {
      return { ...theme, color: color };
    });
  }

  getDropdownClasses() {
    return this.isOpen
      ? 'scale-100 opacity-100 translate-y-0 visible'
      : 'scale-95 opacity-0 -translate-y-5 invisible';
  }

  logout() {
    this.authService.logout();
  }

  signIn() {
    this.router.navigate([PATHS.SIGN_IN]);
  }

  toProfile(link: string) {
    const userData = this.authService.getUserData(); // Get the user object
    const username = userData?.username || 'Guest'; // Extract the username
    this.router.navigate([PATHS.PROFILE + '/' + username], {
      state: { userData: this.authService.getUserData() },
    });
  }
}
