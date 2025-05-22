import { Routes } from '@angular/router';
import { UsersStore } from '@features/users/state/user.store';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/user-list/user-list.component'),
    providers: [UsersStore],
  },
] satisfies Routes;
