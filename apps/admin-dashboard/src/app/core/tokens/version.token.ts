import { InjectionToken } from '@angular/core';

export interface AppInfo {
  name: string;
  version: string;
}

export const APP_INFO = new InjectionToken<AppInfo>('app.info');
