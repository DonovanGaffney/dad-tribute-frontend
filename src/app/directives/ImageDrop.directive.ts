import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appImageDrop]'
})
export class ImageDropDirective {
  @Output() imageDropped = new EventEmitter<File[]>();
  @Output() imageDropHover = new EventEmitter<boolean>();

  // Prevent default drag behaviors
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.imageDropHover.emit(true);
  }

  // Reset styling when drag leaves
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.imageDropHover.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.imageDropHover.emit(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const validFiles: File[] = Array.from(files).filter(file => file.type.startsWith('image/'));
      if(validFiles.length > 0) {
        this.imageDropped.emit(validFiles)
      }
    }
  }
}
