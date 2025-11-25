/**
 * Error Handling Examples for Angular 20
 *
 * This file demonstrates different approaches to handle errors in Angular.
 * The GlobalErrorHandler will catch unhandled errors automatically and show toast messages.
 */

// ============================================================================
// 1. AUTOMATIC ERROR CATCHING (No try-catch needed)
// ============================================================================

export class AutomaticErrorExample {
  // This error will be caught by GlobalErrorHandler automatically
  causeError() {
    const obj: any = undefined;
    // This will trigger: "Cannot read properties of undefined"
    return obj.someProperty;
  }
}

// ============================================================================
// 2. MANUAL TRY-CATCH (When you need custom handling)
// ============================================================================

export class ManualErrorHandlingExample {
  processData(data: any) {
    try {
      // Attempt risky operation
      return data.user.profile.name;
    } catch (error) {
      // Handle error locally without toast
      console.warn('Data processing failed, using default', error);
      return 'Guest';
    }
  }

  // Re-throw error to let GlobalErrorHandler show toast
  processDataWithToast(data: any) {
    try {
      return data.user.profile.name;
    } catch (error) {
      // Log locally then re-throw for toast notification
      console.error('Critical error in data processing:', error);
      throw error; // GlobalErrorHandler will catch and show toast
    }
  }
}

// ============================================================================
// 3. SAFE NAVIGATION WITH OPTIONAL CHAINING (Recommended)
// ============================================================================

export class SafeNavigationExample {
  // ✅ BEST PRACTICE: Use optional chaining to avoid errors
  getUserName(data: any): string {
    return data?.user?.profile?.name ?? 'Guest';
  }

  // ✅ Use nullish coalescing for default values
  getAge(user: any): number {
    return user?.age ?? 0;
  }
}

// ============================================================================
// 4. ASYNC ERROR HANDLING
// ============================================================================

export class AsyncErrorHandlingExample {
  // GlobalErrorHandler will catch unhandled promise rejections
  async fetchDataAutomatic() {
    const response = await fetch('/api/data');
    return response.json(); // If this fails, GlobalErrorHandler catches it
  }

  // Manual error handling with async/await
  async fetchDataManual() {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch failed:', error);
      throw error; // Re-throw for GlobalErrorHandler
    }
  }
}

// ============================================================================
// 5. SIGNAL ERROR HANDLING (Angular Signals)
// ============================================================================

import { computed, signal } from '@angular/core';

export class SignalErrorHandlingExample {
  readonly user = signal<any>(null);

  // ✅ Safe computed signal
  readonly userName = computed(() => {
    return this.user()?.profile?.name ?? 'Guest';
  });

  // ❌ Unsafe - will throw if user is null/undefined
  readonly unsafeUserName = computed(() => {
    return this.user().profile.name; // GlobalErrorHandler will catch this
  });
}

// ============================================================================
// 6. COMPONENT ERROR HANDLING
// ============================================================================

import { Component, effect } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <!-- ✅ Safe template binding -->
    <div>{{ user()?.name ?? 'Guest' }}</div>

    <!-- ✅ Using @if for null checks -->
    @if (user(); as u) {
      <div>{{ u.name }}</div>
    }
  `,
})
export class ComponentErrorExample {
  readonly user = signal<any>(null);

  constructor() {
    // Effects with error handling
    effect(() => {
      try {
        const userName = this.user().name;
        console.log('User name:', userName);
      } catch (error) {
        // Handle locally or re-throw
        console.warn('User not loaded yet');
      }
    });
  }
}

// ============================================================================
// 7. HTTP ERROR HANDLING (Already handled by GlobalErrorHandler)
// ============================================================================

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export class HttpErrorHandlingExample {
  private readonly http = inject(HttpClient);

  // GlobalErrorHandler will catch HTTP errors automatically
  fetchUsers() {
    return this.http.get('/api/users');
  }

  // Custom HTTP error handling (prevents GlobalErrorHandler toast)
  fetchUsersWithCustomHandling() {
    return this.http.get('/api/users').pipe(
      catchError(error => {
        console.error('Custom HTTP error handling:', error);
        return of([]); // Return empty array as fallback
      })
    );
  }
}

// ============================================================================
// SUMMARY
// ============================================================================

/**
 * When to use each approach:
 *
 * 1. AUTOMATIC (No try-catch):
 *    - For unexpected errors that should show user feedback
 *    - When you want errors to bubble up to GlobalErrorHandler
 *
 * 2. TRY-CATCH:
 *    - When you need custom error handling logic
 *    - When you want to provide fallback values
 *    - When you need to log errors locally
 *
 * 3. OPTIONAL CHAINING (?.) - BEST PRACTICE:
 *    - To prevent errors in the first place
 *    - For safe property access on potentially null/undefined values
 *    - Recommended for all data access
 *
 * 4. ASYNC ERROR HANDLING:
 *    - Use async/await with try-catch for custom handling
 *    - Or let GlobalErrorHandler catch unhandled promise rejections
 *
 * 5. HTTP ERRORS:
 *    - GlobalErrorHandler catches these automatically
 *    - Use catchError operator for custom handling
 */
