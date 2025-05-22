import { Component, inject, output } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-theme-selector',
  imports: [SvgIconComponent],
  templateUrl: './theme-selector.component.html',
  styles: ``,
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);

  themeChanged = output<{ color: string; mode: string }>();

  themeColors = [
    { name: 'base', code: '#e11d48' },
    { name: 'yellow', code: '#f59e0b' },
    { name: 'green', code: '#22c55e' },
    { name: 'blue', code: '#3b82f6' },
    { name: 'orange', code: '#ea580c' },
    { name: 'red', code: '#cc0022' },
    { name: 'violet', code: '#6d28d9' },
  ];

  themeMode = ['light', 'dark'];

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }
}
