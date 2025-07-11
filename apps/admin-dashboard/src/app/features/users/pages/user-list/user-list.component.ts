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
import { EditFormComponent } from '@features/users/components/edit-form/edit-form.component';
import { UserTableComponent } from '@features/users/components/user-table/user-table.component';
import { User } from '@features/users/models/user.model';
import { UsersStore } from '@features/users/state/user.store';
import { TranslocoDirective } from '@jsverse/transloco';
import { toast } from 'ngx-sonner';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  imports: [
    TranslocoDirective,
    UserTableComponent,
    UserFormComponent,
    EditFormComponent,
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
  protected authStore = inject(AuthService);
  readonly formSection = viewChild<ElementRef<HTMLDivElement>>('formSection');

  readonly showForm = signal(false);
  readonly editingUser = signal<User | null>(null);

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

  onEdit(user: User) {
    if (!this.authStore.canEdit()) {
      toast.error('Unauthorized', {
        description: 'You need to be logged in to edit users.',
      });
      return;
    }

    this.editingUser.set(user);
  }

  saveEdit(user: User) {
    this.userStore.updateUser(user);
    toast.success('User updated!', {
      description: `User "${user.name}" has been updated.`,
      duration: 4000,
      position: 'top-right',
    });
    this.editingUser.set(null);
  }

  onDelete(user: User) {
    if (!this.authStore.canDelete()) {
      toast.error('Unauthorized', {
        description: 'Only admins can delete users.',
      });
      return;
    }

    // Confirmation dialog
    const confirmed = confirm(
      `Are you sure you want to delete user "${user.name}"?`
    );
    if (!confirmed) {
      toast.info('Delete cancelled', {
        description: `User "${user.name}" was not deleted.`,
      });
      return;
    }

    this.userStore.deleteUser(user.id);
    toast.success('User deleted!', {
      description: `User "${user.name}" has been removed from the system.`,
      duration: 4000,
      position: 'top-right',
    });
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
    toast.success('User created!', {
      description: 'The user has been added to the system.',
      duration: 4000,
      position: 'top-right',
    });
  }
}
