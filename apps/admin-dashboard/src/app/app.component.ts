import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from '@core/services/spinner.service';
import { NgxSonnerToaster } from 'ngx-sonner';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, SpinnerComponent],
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'admin-dashboard';
  readonly spinner = inject(SpinnerService);

  constructor() {
    this.spinner.dispatch(true);
    setTimeout(() => this.spinner.dispatch(false), 30000);
  }
}
