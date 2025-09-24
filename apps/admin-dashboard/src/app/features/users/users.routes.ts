import { Routes } from '@angular/router';
import { UsersStore } from '@features/users/state/user.store';
import { provideTranslocoScope } from '@jsverse/transloco';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/user-list/user-list.component'),
    providers: [UsersStore, provideTranslocoScope('users')],
  },
] satisfies Routes;
