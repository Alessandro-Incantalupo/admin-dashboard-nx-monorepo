import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
// import packageJson from '@root/package.json';
import { ThemeStore } from '@core/state/theme.store';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';

/**
 * app.config.ts = global config file passed into bootstrapApplication()
 * It contains all the DI providers Angular should use app-wide.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Enables Angular routing with lazy loading and route guards
    provideRouter(routes),

    // Adds HttpClient so we can make HTTP requests in services
    provideHttpClient(),

    // Provides Angular's change detection system (required by default)
    // The `eventCoalescing: true` option optimizes performance by batching multiple events
    // of the same type within a single change detection cycle, reducing redundant checks.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Enables animations with better performance (lazy initialization)
    provideAnimationsAsync(),

    // Registers PrimeNG UI config so components work globally
    providePrimeNG(),

    // Allows using SVG icons like <svg-icon src="..."></svg-icon>
    provideAngularSvgIcon(),
    // Custom DI token containing package metadata (e.g. version, name)
    // { provide: APP_INFO, useValue: packageJson },
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'it'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    ThemeStore,
  ],
};
