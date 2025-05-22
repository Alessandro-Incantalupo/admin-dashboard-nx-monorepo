import { Component, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [SvgIconComponent, ButtonComponent],
  templateUrl: './error-page.component.html',
  styles: ``,
})
export class ErrorPageComponent {
  router = inject(Router);

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
