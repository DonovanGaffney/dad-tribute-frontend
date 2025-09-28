import {Component, input, output, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {ClickOutsideDirective} from '../directives/clickOutside.directive';

@Component({
  selector: 'app-image',
  imports: [
    NgIf,
    ClickOutsideDirective
  ],
  templateUrl: './image.html',
  styleUrl: './image.css'
})
export class Image {
  imageUrl = input<string>('');
  onOpen = output<void>();
  onClose = output<void>();

  isImageFullScreen: WritableSignal<boolean> = signal(false);

  open() {
    this.isImageFullScreen.set(true);
    this.onOpen.emit();
  }

  close() {
    this.isImageFullScreen.set(false);
    this.onClose.emit();
  }
}
