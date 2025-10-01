import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.js';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// jest.mock('random-global-dependency-example', () => ({}));
// Mock `window.matchMedia` to prevent errors in tests (ngx-sonner related)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
