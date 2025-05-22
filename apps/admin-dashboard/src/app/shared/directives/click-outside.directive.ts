import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  clickOutside = output();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const isClickedInside =
      this.elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      this.clickOutside.emit();
    }
  }
}
