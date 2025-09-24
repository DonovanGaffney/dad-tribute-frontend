import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from "@angular/core";

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    const isButtonClick = (event.target as HTMLElement).tagName === 'BUTTON'
      || (event.target as HTMLElement).closest('button') !== null;

    if (!clickedInside && !isButtonClick) {
      this.clickOutside.emit();
    }
  }
}
