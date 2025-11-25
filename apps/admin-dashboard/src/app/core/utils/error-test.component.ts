import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

/**
 * Test component to verify GlobalErrorHandler is working.
 *
 * Usage:
 * 1. Import this component in your routes or add to imports
 * 2. Navigate to the test page
 * 3. Click buttons to trigger different error types
 * 4. Verify toast notifications appear
 */
@Component({
  selector: 'app-error-test',
  imports: [CommonModule],
  template: `
    <div class="mx-auto max-w-4xl p-8">
      <h1 class="mb-6 text-3xl font-bold">Error Handler Test Page</h1>

      <div class="space-y-4">
        <div class="rounded-lg bg-white p-6 shadow">
          <h2 class="mb-4 text-xl font-semibold">Test Cases</h2>

          <div class="space-y-2">
            <button
              (click)="testUndefinedPropertyError()"
              class="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Test: Cannot read properties of undefined
            </button>

            <button
              (click)="testNullPropertyError()"
              class="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Test: Cannot read properties of null
            </button>

            <button
              (click)="testFunctionError()"
              class="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Test: X is not a function
            </button>

            <button
              (click)="testAsyncError()"
              class="w-full rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Test: Async/Promise Error
            </button>

            <button
              (click)="testCustomError()"
              class="w-full rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            >
              Test: Custom Error Message
            </button>
          </div>
        </div>

        <div class="rounded-lg bg-blue-50 p-6">
          <h3 class="mb-2 font-semibold">Expected Behavior:</h3>
          <ul class="list-inside list-disc space-y-1 text-sm">
            <li>Toast notification should appear for each error</li>
            <li>User-friendly error message in toast</li>
            <li>Detailed error in browser console</li>
            <li>Application should continue running</li>
          </ul>
        </div>

        <div class="rounded-lg bg-green-50 p-6">
          <h3 class="mb-2 font-semibold">Safe Example (No Error):</h3>
          <button
            (click)="testSafeAccess()"
            class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Test: Safe Property Access (No Error)
          </button>
          <p class="mt-2 text-sm">Result: {{ safeResult() }}</p>
        </div>
      </div>
    </div>
  `,
})
export class ErrorTestComponent {
  readonly safeResult = signal<string>('Click button to test');

  testUndefinedPropertyError() {
    const obj: any = undefined;
    // This will trigger: "Cannot read properties of undefined"
    return obj.someProperty;
  }

  testNullPropertyError() {
    const obj: any = null;
    // This will trigger: "Cannot read properties of null"
    return obj.someProperty;
  }

  testFunctionError() {
    const obj: any = { value: 'test' };
    // This will trigger: "X is not a function"
    return obj.nonExistentFunction();
  }

  async testAsyncError() {
    // This will trigger an unhandled promise rejection
    throw new Error('Async operation failed');
  }

  testCustomError() {
    throw new Error('This is a custom error message for testing');
  }

  testSafeAccess() {
    const obj: any = undefined;
    // Safe access - no error thrown
    const value = obj?.someProperty ?? 'Default Value';
    this.safeResult.set(`Safe access succeeded: ${value}`);
  }
}
