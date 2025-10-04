import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-error-page',
  imports: [SvgIconComponent, ButtonComponent],
  templateUrl: './error-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  router = inject(Router);

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
