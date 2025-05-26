import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '@features/users/models/user.model';
import { UsersStore } from '@features/users/state/user.store';
import { toast } from 'ngx-sonner';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private userStore = inject(UsersStore);
  private readonly destroyRef = inject(DestroyRef);
  readonly submitted = signal(false);

  readonly form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    role: this.fb.control('', { validators: [Validators.required] }),
  });

  ngOnInit() {
    this.form
      .get('name')!
      .valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        map(value => value.toUpperCase())
      )
      .subscribe(val => {});
  }

  onSubmit() {
    this.submitted.set(true);

    if (this.form.invalid) {
      toast.error('Please fill out the form correctly');
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      status: 'active',
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      role: (this.form.value.role as 'admin' | 'user') ?? 'user',
    };

    this.userStore.addUser(newUser);
    toast.success('User added');
    this.form.reset({ role: 'user' });
    this.submitted.set(false);
  }
}
