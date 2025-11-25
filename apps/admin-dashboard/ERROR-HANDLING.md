# Global Error Handling in Angular 20

## Overview

This application uses a custom `GlobalErrorHandler` to catch and display all unhandled errors as toast notifications using `ngx-sonner`.

## What Errors Are Caught?

The `GlobalErrorHandler` automatically catches:

1. **Runtime JavaScript Errors**
   - `Cannot read properties of undefined`
   - `Cannot read properties of null`
   - `X is not a function`
   - `Cannot set properties of undefined`
   - And all other JavaScript errors

2. **HTTP Errors**
   - Network errors (status 0)
   - Client errors (4xx)
   - Server errors (5xx)

3. **Promise Rejections**
   - Unhandled async/await errors
   - Promise rejection errors

## How It Works

1. **GlobalErrorHandler Service** (`core/services/global-error-handler.service.ts`)
   - Implements Angular's `ErrorHandler` interface
   - Parses errors and creates user-friendly messages
   - Shows toast notifications using `ngx-sonner`
   - Logs detailed errors to console

2. **Registration** (`app.config.ts`)
   ```typescript
   { provide: ErrorHandler, useClass: GlobalErrorHandler }
   ```

## Best Practices

### ✅ DO: Use Optional Chaining (Recommended)

Prevent errors before they happen:

```typescript
// Instead of this (will throw error):
const name = user.profile.name;

// Use this (safe):
const name = user?.profile?.name ?? 'Guest';
```

### ✅ DO: Let GlobalErrorHandler Catch Unexpected Errors

For errors that should show user feedback:

```typescript
processData(data: any) {
  // This error will be caught and shown as toast
  return data.user.profile.name;
}
```

### ✅ DO: Use Try-Catch for Custom Handling

When you need specific error handling:

```typescript
processData(data: any) {
  try {
    return data.user.profile.name;
  } catch (error) {
    console.warn('Using default value');
    return 'Guest';
  }
}
```

### ✅ DO: Re-throw for Toast Notifications

Handle locally, then let user know:

```typescript
processData(data: any) {
  try {
    return data.user.profile.name;
  } catch (error) {
    console.error('Critical error:', error);
    throw error; // GlobalErrorHandler will show toast
  }
}
```

### ❌ DON'T: Catch and Swallow Errors

This prevents GlobalErrorHandler from working:

```typescript
// Bad: User won't see any error
fetchData() {
  try {
    return this.http.get('/api/data');
  } catch (error) {
    // Error is hidden from user
  }
}
```

## Template Error Prevention

### Use @if for null checks

```html
@if (user(); as u) {
<div>{{ u.name }}</div>
}
```

### Use optional chaining in templates

```html
<div>{{ user()?.profile?.name ?? 'Guest' }}</div>
```

## HTTP Error Handling

HTTP errors are automatically caught by `GlobalErrorHandler`:

```typescript
// Automatic error handling with toast
fetchUsers() {
  return this.http.get('/api/users');
}
```

For custom HTTP error handling (prevents toast):

```typescript
fetchUsers() {
  return this.http.get('/api/users').pipe(
    catchError((error) => {
      // Custom handling (no toast)
      console.error('Error:', error);
      return of([]);
    })
  );
}
```

## Testing Error Handling

To test that errors are caught:

1. Open browser console
2. Trigger an error in your component
3. You should see:
   - Toast notification with user-friendly message
   - Detailed error in browser console

## Customizing Error Messages

Edit `GlobalErrorHandler` in `core/services/global-error-handler.service.ts`:

```typescript
if (error.message.includes('your-specific-error')) {
  errorMessage = 'Your custom user-friendly message';
}
```

## Disabling Toast for Specific Errors

If you don't want GlobalErrorHandler to show a toast:

```typescript
try {
  riskyOperation();
} catch (error) {
  // Handle locally without re-throwing
  console.log('Handled locally');
}
```

## Files

- `apps/admin-dashboard/src/app/core/services/global-error-handler.service.ts` - Main error handler
- `apps/admin-dashboard/src/app/app.config.ts` - Error handler registration
- `apps/admin-dashboard/src/app/core/utils/error-handling-examples.ts` - Usage examples
