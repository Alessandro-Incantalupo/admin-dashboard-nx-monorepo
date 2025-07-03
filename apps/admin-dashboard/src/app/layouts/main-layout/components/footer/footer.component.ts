import { Component } from '@angular/core';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoDirective],
  templateUrl: './footer.component.html',
  styles: ``,
  providers: [provideTranslocoScope('general')],
})
export class FooterComponent {
  public year: number = new Date().getFullYear();
}
