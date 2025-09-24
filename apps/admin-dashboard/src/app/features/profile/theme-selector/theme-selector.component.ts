import { Component, inject } from '@angular/core';
import { ThemeStore } from '@core/state/theme.store';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.component.html',
  styles: ``,
})
export class ThemeSelectorComponent {
  themeStore = inject(ThemeStore);
}
