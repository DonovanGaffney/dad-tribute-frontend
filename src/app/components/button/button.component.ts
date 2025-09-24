import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

export enum ButtonVariant {
  Primary,
  Secondary,
  Success,
  Danger
}

@Component({
    selector: 'app-button',
    imports: [
        NgClass
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() customClass: string = '';
  @Input() variant: ButtonVariant = ButtonVariant.Primary; //TODO: Make string choices
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  disabled = input<boolean>(false);

  click() {
    this.onClick.emit();
  }

  protected readonly ButtonVariant = ButtonVariant;
}
