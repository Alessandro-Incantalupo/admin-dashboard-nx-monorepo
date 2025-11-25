import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse | unknown): void {
    console.error('Global error caught:', error);

    let errorMessage = 'An unexpected error occurred';
    let errorDetail = '';

    // Handle HTTP errors
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = 'Network error: Unable to connect to server';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage =
          error.error?.message || `Client error: ${error.statusText}`;
      } else if (error.status >= 500) {
        errorMessage = 'Server error: Please try again later';
      }
      errorDetail = `Status: ${error.status}, URL: ${error.url}`;
    }
    // Handle standard JavaScript errors
    else if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
      errorDetail = error.stack || '';

      // Handle specific error types with better messages
      if (error.message.includes('Cannot read properties of undefined')) {
        const match = error.message.match(/reading '(\w+)'/);
        const property = match ? match[1] : 'property';
        errorMessage = `Cannot access '${property}' of undefined value`;
      } else if (error.message.includes('Cannot read properties of null')) {
        const match = error.message.match(/reading '(\w+)'/);
        const property = match ? match[1] : 'property';
        errorMessage = `Cannot access '${property}' of null value`;
      } else if (error.message.includes('is not a function')) {
        const match = error.message.match(/(\w+) is not a function/);
        const fn = match ? match[1] : 'method';
        errorMessage = `'${fn}' is not a function`;
      } else if (error.message.includes('Cannot set properties of undefined')) {
        errorMessage = 'Cannot set property on undefined value';
      } else if (error.message.includes('undefined is not an object')) {
        errorMessage = 'Trying to use an undefined value as an object';
      }
    }
    // Handle promise rejections
    else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'rejection' in error) {
      errorMessage = 'Promise rejection: ' + String((error as any).rejection);
    }

    // Show toast notification
    toast.error('Error', {
      description: errorMessage,
      duration: 5000,
    });

    // Log full error in development
    if (errorDetail) {
      console.error('Error details:', errorDetail);
    }
  }
}
