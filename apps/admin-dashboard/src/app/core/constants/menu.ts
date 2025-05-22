import { CustomMenuItem } from '../models/menu.model';
import { PATHS } from './routes';

export const pages: CustomMenuItem[] = [
  {
    group: 'Base',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'Dashboard',
        route: PATHS.DASHBOARD,
        children: [
          { label: 'Nfts', route: PATHS.DASHBOARD_NFTS },
          // { label: 'Podcast', route: '/dashboard/podcast' },
        ],
      },
      {
        icon: 'assets/icons/heroicons/outline/lock-closed.svg',
        label: 'Auth',
        route: PATHS.AUTH,
        children: [
          { label: 'Sign up', route: PATHS.SIGN_UP },
          { label: 'Sign in', route: PATHS.SIGN_IN },
          {
            label: 'Sign in template driven',
            route: PATHS.SIGN_IN_TEMPLATE_DRIVEN,
          },
          { label: 'Forgot Password', route: PATHS.FORGOT_PASSWORD },
          { label: 'New Password', route: PATHS.NEW_PASSWORD },
          { label: 'Two Steps', route: PATHS.TWO_STEPS },
        ],
      },
      {
        icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
        label: 'Errors',
        route: PATHS.ERRORS,
        children: [
          { label: '404', route: PATHS.ERROR_404 },
          { label: '500', route: PATHS.ERROR_500 },
        ],
      },
      {
        icon: 'assets/icons/heroicons/outline/cube.svg',
        label: 'Features',
        route: PATHS.FEATURES_UI,
        children: [{ label: 'Table', route: PATHS.FEATURES_TABLE }],
      },
    ],
  },
  {
    group: 'Collaboration',
    separator: true,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/download.svg',
        label: 'Download',
        route: PATHS.DOWNLOAD,
      },
      {
        icon: 'assets/icons/heroicons/outline/gift.svg',
        label: 'Gift Card',
        route: PATHS.GIFT,
      },
      {
        icon: 'assets/icons/heroicons/outline/users.svg',
        label: 'Users',
        route: PATHS.USERS,
      },
    ],
  },
  {
    group: 'Config',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/cog.svg',
        label: 'Settings',
        route: PATHS.SETTINGS,
      },
      {
        icon: 'assets/icons/heroicons/outline/bell.svg',
        label: 'Notifications',
        route: PATHS.NOTIFICATIONS,
      },
      {
        icon: 'assets/icons/heroicons/outline/folder.svg',
        label: 'Folders',
        route: PATHS.FOLDERS,
        children: [
          { label: 'Current Files', route: PATHS.FOLDERS_CURRENT_FILES },
          { label: 'Downloads', route: PATHS.FOLDERS_DOWNLOAD },
          { label: 'Trash', route: PATHS.FOLDERS_TRASH },
        ],
      },
    ],
  },
];
