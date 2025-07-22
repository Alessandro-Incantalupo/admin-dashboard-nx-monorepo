import { User } from '@admin-dashboard-nx-monorepo/models';
import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
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
})
export class PrimeNgTableComponent {
  private messageService = inject(MessageService);
  readonly users = input.required<User[]>();
  roles = input<SelectItem<any>[]>();
  readonly readOnly = input<boolean>(false);
  readonly editAction = output<User>();
  readonly deleteAction = output<User>();
  clonedUsers: { [s: string]: User } = {};

  onRowEditInit(user: User) {
    this.clonedUsers[user.id] = { ...user };
  }

  onRowEditSave(user: User) {
    if (user.name && user.email) {
      delete this.clonedUsers[user.id];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User is updated',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid data',
      });
    }
  }

  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.id];
    delete this.clonedUsers[user.id];
  }

  onRowDelete(user: User, index: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.userDeleted.emit({ user, index });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Delete operation cancelled',
        });
      },
    });
  }
}
