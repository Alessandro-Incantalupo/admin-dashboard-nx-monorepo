import { Component, effect, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { PATHS } from '../../../core/constants/routes';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-sign-in',
  imports: [SvgIconComponent, RouterLink, ButtonComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  nnfb = inject(NonNullableFormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  isLoading = signal(false);
  submitted = false;
  passwordTextType!: boolean;
  loginError = signal<string | null>(null); // Store login error
  protected PATHS = PATHS;

  form = this.nnfb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  readonly handleRedirect = effect(() => {
    const status = this.authService.loginStatus();
    const user = this.authService.userData();

    if (status === 'success' && user) {
      const username = user.username ?? user.email?.split('@')[0];
      if (!username) return;
      this.router.navigate([PATHS.PROFILE, username], {
        state: { userData: user },
      });
    }

    if (status === 'error') {
      this.loginError.set(this.authService.error());
    }
  });

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.authService.login({ email, password });
  }

  // Helper function to check form field validity
  hasError(controlName: string, errorType: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorType) && control.touched;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
}
