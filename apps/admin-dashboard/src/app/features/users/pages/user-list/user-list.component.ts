import { User } from '@admin-dashboard-nx-monorepo/models';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AuthStore } from '@core/state/auth.store';
import { RoleDescriptionComponent } from '@features/users/components/role-description/role-description.component';
import { RoleSelectorComponent } from '@features/users/components/role-selector/role-selector.component';
import { UserAbilitiesComponent } from '@features/users/components/user-abilities/user-abilities.component';
import { UsersStore } from '@features/users/state/user.store';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { AppleIcon, HomeIcon } from '@hugeicons/core-free-icons/index';
import { TranslocoDirective } from '@jsverse/transloco';
import { PrimeNgTableComponent } from '@shared/prime-ng-table/prime-ng-table.component';
import { TabComponent } from '@shared/tab/tab.component';
import { toast } from 'ngx-sonner';

import { UserFormComponent } from '../../components/user-form/user-form.component';
@Component({
  selector: 'app-user-list',
  imports: [
    TranslocoDirective,
    UserFormComponent,
    PrimeNgTableComponent,
    RoleSelectorComponent,
    UserAbilitiesComponent,
    RoleDescriptionComponent,
    HugeiconsIconComponent,
    TabComponent,
  ],
  templateUrl: './user-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserListComponent {
  protected userStore = inject(UsersStore);
  protected authStore = inject(AuthStore);
  readonly formSection = viewChild<ElementRef<HTMLDivElement>>('formSection');

  readonly showForm = signal(false);
  clonedUsers: { [s: string]: User } = {};
  readonly roles = [
    { label: 'Guest', value: 'guest' },
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  readonly demoCredentials = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      description: 'Full access to create, edit, and delete users',
    },
    {
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
      description: 'Can view and edit users',
    },
  ] as const;

  readonly tabs = signal([
    { name: 'Tab 1', icon: HomeIcon },
    { name: 'Tab 2', icon: AppleIcon },
    { name: 'Tab 3', icon: HomeIcon },
  ]);
  readonly activeTab = signal<string>('Tab 1');

  constructor() {
    effect(() => {
      if (this.showForm() && this.formSection()) {
        this.formSection().nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
        setTimeout(() => {
          const button =
            this.formSection().nativeElement.querySelector('button');
          button?.focus();
        }, 100);
      }
    });
  }

  quickLogin(userType: 'admin' | 'user') {
    const credentials = this.demoCredentials.find(
      cred => cred.role === userType
    );
    if (credentials) {
      this.authStore.login({
        email: credentials.email,
        password: credentials.password,
      });
    }
  }

  canEditUser(user: User): boolean {
    const currentUser = this.authStore.userData();
    const role = currentUser?.role ?? 'guest';

    const editRules = {
      admin: () => true,
      user: () => user.email !== currentUser?.email && user.role === 'user',
      guest: () => false,
    } as const;

    return (editRules[role] ?? editRules.guest)();
  }

  saveEdit(user: User) {
    this.userStore.updateUser(user);
  }

  onEdit(user: User) {
    if (!this.authStore.canEdit()) {
      toast.error('Unauthorized', {
        description: 'You need to be logged in to edit users.',
      });
      return;
    }
    this.userStore.startEditing(user);
  }

  onRowEditSave(user: User) {
    this.userStore.cancelEditing(user);
    this.userStore.updateUser(user);
  }

  onRowEditCancel({ user }: { user: User; index: number }) {
    this.userStore.restoreUser(user);
  }

  onDelete(event: { user: User; index: number }) {
    if (!this.authStore.canDelete()) {
      toast.error('Unauthorized', {
        description: 'Only admins can delete users.',
      });
      return;
    }

    // Confirmation dialog
    const confirmed = confirm(
      `Are you sure you want to delete user "${event.user.name}"?`
    );
    if (!confirmed) {
      toast.info('Delete cancelled', {
        description: `User "${event.user.name}" was not deleted.`,
      });
      return;
    }

    this.userStore.deleteUser(event.user.id);
  }

  toggleForm() {
    if (!this.authStore.canCreate()) {
      toast.error('Unauthorized', {
        description: 'Only admins can create users.',
      });
      return;
    }
    this.showForm.set(!this.showForm());
  }
}
