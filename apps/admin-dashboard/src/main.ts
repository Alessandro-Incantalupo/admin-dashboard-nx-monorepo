import { bootstrapApplication } from '@angular/platform-browser';
import { toast } from 'ngx-sonner';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Handle unhandled promise rejections globally
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);

  let errorMessage = 'An unexpected async error occurred';

  if (event.reason instanceof Error) {
    errorMessage = event.reason.message;
  } else if (typeof event.reason === 'string') {
    errorMessage = event.reason;
  }

  toast.error('Async Error', {
    description: errorMessage,
    duration: 5000,
  });

  // Prevent default browser error handling
  event.preventDefault();
});

// Bootstraps the standalone app using modern Angular API (no AppModule needed)
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
