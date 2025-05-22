import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
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
  readonly showForm = signal(false);

  onEdit(user: User) {
    console.log('Edit user:', user);
  }

  onDelete(user: User) {
    this.userStore.deleteUser(user.id);
  }

  toggleForm() {
    this.showForm.set(!this.showForm());
  }

  addUser() {
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
