import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { User } from '@models';

@Component({
  selector: 'app-user-table',
  imports: [],
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
