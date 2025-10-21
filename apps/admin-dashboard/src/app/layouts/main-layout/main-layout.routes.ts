import { Routes } from '@angular/router';
import { PATHS } from '../../core/constants/routes';
import { MainLayoutComponent } from './main-layout.component';
import { MenuService } from './services/menu.service';

export default [
  {
    path: '',
    pathMatch: 'full', // Ensure exact match for the root path
    redirectTo: PATHS.USERS, // Redirect to the default route
  },
  {
    path: '',
    component: MainLayoutComponent,
    providers: [MenuService],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: PATHS.FEATURES_UI,
        loadChildren: () => import('../../features/ui/ui.routes'),
      },
      {
        path: PATHS.USERS,
        loadChildren: () => import('../../features/users/users.routes'),
      },
      {
        path: PATHS.GITHUB_PROFILE,
        loadComponent: () =>
          import('../../features/github-profile/github-profile.component'),
      },
    ],
  },
] satisfies Routes;
