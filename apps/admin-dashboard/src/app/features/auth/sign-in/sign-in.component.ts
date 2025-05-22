import { Component, computed, inject, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PATHS } from '../../../core/constants/routes';

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

  // Reactive Form
  form = this.nnfb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.submitted = true;
    this.loginError.set(null); // Clear previous errors

    if (this.form.invalid) return;

    this.isLoading.set(true);
    const { email, password } = this.form.value;

    const success = this.authService.login(email!, password!);
    if (success) {
      this.form.markAsPristine();
      const userData = this.authService.getUserData();
      this.router.navigate([PATHS.PROFILE, userData.username], { state: { userData } });
    } else {
      this.loginError.set('Invalid email or password');
      this.isLoading.set(false);
    }
  }

  // Helper function to check form field validity
  hasError(controlName: string, errorType: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorType) && control.touched;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  protected readonly PATHS = PATHS;
}
