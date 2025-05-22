import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-management',
  imports: [ReactiveFormsModule],
  templateUrl: './role-management.component.html',
  styles: ``,
})
export class RoleManagementComponent {
  fb = inject(FormBuilder);

  roleForm: FormGroup = this.fb.group({
    roles: this.fb.array([]),
  });
}
