import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { User } from '@features/users/models/user.model';

@Component({
  selector: 'app-user-table',
  imports: [SvgIconComponent],
  templateUrl: './user-table.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  users = input.required<User[]>();
  editAction = output<User>();
  deleteAction = output<User>();
}
