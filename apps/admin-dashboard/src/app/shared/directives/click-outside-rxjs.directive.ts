import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[clickOutsideRxjs]',
  standalone: true,
})
export class ClickOutsideRxjsDirective {
  private readonly dom = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  clickOutside = outputFromObservable(
    fromEvent(this.dom, 'click').pipe(
      filter(
        event =>
          !this.elementRef.nativeElement.contains(event.target as HTMLElement)
      )
    )
  );
}
