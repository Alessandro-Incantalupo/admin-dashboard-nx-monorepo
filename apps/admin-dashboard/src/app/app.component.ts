import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from '@core/services/spinner.service';
import { ThemeStore } from '@core/state/theme.store';
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
  themeStore = inject(ThemeStore);

  // Test methods to trigger different errors
  testUndefinedError() {
    const obj: any = undefined;
    return obj.someProperty; // Will trigger: Cannot read properties of undefined
  }

  testNullError() {
    const obj: any = null;
    return obj.someProperty; // Will trigger: Cannot read properties of null
  }

  testFunctionError() {
    const obj: any = { value: 'test' };
    return obj.nonExistentMethod(); // Will trigger: X is not a function
  }

  async testAsyncError() {
    throw new Error('Async error test');
  }
}
