import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { UserTableComponent } from '@features/users/components/user-table/user-table.component';
import { User } from '@features/users/models/user.model';
import { UsersStore } from '@features/users/state/user.store';
import { TranslocoDirective } from '@jsverse/transloco';
import { toast } from 'ngx-sonner';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  imports: [TranslocoDirective, UserTableComponent, UserFormComponent],
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
  readonly showForm = signal(false);

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

  onEdit(user: User) {
    if (!this.authStore.canEdit()) {
      toast.error('Unauthorized', {
        description: 'You need to be logged in to edit users.',
      });
      return;
    }
    console.log('Edit user:', user);
  }

  onDelete(user: User) {
    if (!this.authStore.canDelete()) {
      toast.error('Unauthorized', {
        description: 'Only admins can delete users.',
      });
      return;
    }
    this.userStore.deleteUser(user.id);
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
      toast.error('Unauthorized');
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
