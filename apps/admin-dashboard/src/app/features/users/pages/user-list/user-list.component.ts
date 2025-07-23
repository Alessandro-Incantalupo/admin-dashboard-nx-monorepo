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
import { AuthService } from '@core/services/auth.service';
import { UsersStore } from '@features/users/state/user.store';
import { TranslocoDirective } from '@jsverse/transloco';
import { PrimeNgTableComponent } from '@shared/prime-ng-table/prime-ng-table.component';
import { toast } from 'ngx-sonner';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  imports: [TranslocoDirective, UserFormComponent, PrimeNgTableComponent],
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
  protected authStore = inject(AuthService);
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

  constructor() {
    effect(() => {
      if (this.showForm() && this.formSection()) {
        this.formSection().nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        const input = this.formSection().nativeElement.querySelector('input');
        input?.focus();
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

  setRole(role: 'guest' | 'user' | 'admin') {
    this.authStore.setRole(role);
  }

  getRoleDescription() {
    return this.authStore.getRoleDescription();
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

  onEditOld(user: User) {
    if (!this.authStore.canEdit()) {
      toast.error('Unauthorized', {
        description: 'You need to be logged in to edit users.',
      });
      return;
    }
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

  addUser() {
    if (!this.authStore.canCreate()) {
      toast.error('Unauthorized', {
        description: 'Only admins can add users.',
      });
      return;
    }
    this.userStore.addUser({
      id: crypto.randomUUID(),
      name: 'New User',
      email: 'new@example.com',
      role: 'user',
      status: 'active',
    });
  }
}
