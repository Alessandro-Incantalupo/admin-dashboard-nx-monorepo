import { User } from '@admin-dashboard-nx-monorepo/models';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-prime-ng-table',
  templateUrl: './prime-ng-table.component.html',
  imports: [
    TableModule,
    ToastModule,
    CommonModule,
    TagModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
  providers: [MessageService],
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeNgTableComponent {
  readonly users = input.required<User[]>();
  readonly roles = input<SelectItem<any>[]>();
  readonly readOnly = input<boolean>(false);
  readonly totalUsers = input<number>(0);
  readonly editAction = output<User>();
  readonly deleteAction = output<{ user: User; index: number }>();
  readonly saveAction = output<User>();
  readonly saveActionCancel = output<{ user: User; index: number }>();
}
