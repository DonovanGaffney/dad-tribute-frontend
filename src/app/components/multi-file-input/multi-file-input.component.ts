import {Component, input, Input, InputSignal, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ClickStopPropagation} from "../../directives/stopPropagation.directive";
import {ImageDropDirective} from "../../directives/ImageDrop.directive";

@Component({
  selector: 'app-multi-file-input',
  standalone: true,
  imports: [
    ImageDropDirective,
    NgClass,
    ClickStopPropagation
  ],
  templateUrl: './multi-file-input.component.html',
  styleUrl: './multi-file-input.component.scss'
})
export class MultiFileInputComponent implements OnInit, OnDestroy {
  @Input({required: true}) control!: FormControl<File[]>;
  isOptional: InputSignal<boolean> = input<boolean>(false);

  isDraggedOver: WritableSignal<boolean> = signal(false);
  fileNames: string[] = [];

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  handleImageDrop(file: File[]) {
    for(let i = 0; i < file.length; i++) {
      this.addToCurrentImages(file[i]);
    }
  }

  isDragHovered(isDragHovered: boolean) {
    this.isDraggedOver.set(isDragHovered);
  }

  onImagePicked(event: Event) {
    if(!(event.target as HTMLInputElement).files) {
      console.error('No files');
      return;
    } else if ((event.target as HTMLInputElement).files!.length == 0) {
      console.error('No file selected');
      return;
    }


    const fileCount = (event.target as HTMLInputElement).files!.length;

    for (let i = 0; i < fileCount; i++) {
      this.addToCurrentImages((event.target as HTMLInputElement).files![i]);
    }
  }

  addToCurrentImages(file: File) {
    // if (!file.type.startsWith('image/')) {
    //   console.error('Not an image');
    //   return;
    // }

    const currentFiles = this.control.value;

    // Create a new DataTransfer object to act as a mutable FileList
    const dataTransfer = new DataTransfer();

    // Append current files if any
    if (currentFiles) {
      for (let i = 0; i < currentFiles.length; i++) {
        dataTransfer.items.add(currentFiles[i]);
      }
    }

    // Add the new file
    dataTransfer.items.add(file);
    this.control.setValue(Array.from(dataTransfer.files));

    this.fileNames.push(file.name);
  }

  removeFile(index: number) {
    this.fileNames.splice(index, 1);

    const dataTransfer = new DataTransfer();
    const currentFiles = this.control.value;

    if (currentFiles) {
      for (let i = 0; i < currentFiles.length; i++) {
        if (i !== index) {
          dataTransfer.items.add(currentFiles[i]);
        }
      }
      this.control.setValue(Array.from(dataTransfer.files));
    }

  }
}
