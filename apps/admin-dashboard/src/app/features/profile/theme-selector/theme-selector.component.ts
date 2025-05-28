import { Component, inject } from '@angular/core';
import { ThemeStore } from '@core/state/theme.store';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-theme-selector',
  imports: [SvgIconComponent],
  templateUrl: './theme-selector.component.html',
  styles: ``,
})
export class ThemeSelectorComponent {
  themeStore = inject(ThemeStore);
}
