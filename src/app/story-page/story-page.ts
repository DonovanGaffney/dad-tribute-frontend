import {Component, signal, WritableSignal} from '@angular/core';
import {InputComponent} from '../components/input/input.component';
import {TextAreaComponent} from '../components/text-area/text-area.component';
import {MultiFileInputComponent} from '../components/multi-file-input/multi-file-input.component';
import {AbstractControl, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {StoryService} from '../services/story';
import {Router} from '@angular/router';

@Component({
  selector: 'app-story-page',
  imports: [
    InputComponent,
    TextAreaComponent,
    MultiFileInputComponent,
    FormsModule
  ],
  templateUrl: './story-page.html',
  styleUrl: './story-page.css'
})
export class StoryPage {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    story: new FormControl('', [Validators.required, Validators.minLength(1)]),
    fileControl: new FormControl<File[]>([])
  });
  triedToSubmit = false;
  isUploading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private storyService: StoryService, private router: Router) {
  }

  get fileControl(): FormControl<File[]> {
    return this.formGroup.get('fileControl') as FormControl<File[]>;
  }
  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }
  get story(): FormControl {
    return this.formGroup.get('story') as FormControl;
  }

  onSubmit() {
    this.triedToSubmit = true;
    if(!this.formGroup.valid) {
      return;
    }

    const formData = this.getForm();

    this.isUploading.set(true);
    this.storyService.uploadStory(formData).subscribe({
      next: () => {
        this.router.navigate(['/stories']);
        this.isUploading.set(false);
      },
      error: () => {
        this.isUploading.set(false);
      },
      complete: () => {
        this.isUploading.set(false);
      }
    });
  }

  getForm(): FormData {
    const formData: FormData = new FormData();
    formData.append('name', this.name.value);
    formData.append('story', this.story.value);

    const files = this.fileControl.value;
    for(let pos=0; pos < files!.length; pos++) {
      formData.append("files", files[pos], files[pos].name);
    }


    return formData;
  }

  hasErrors(formControl: AbstractControl) {
    return !formControl.valid && (this.triedToSubmit || formControl.touched);
  }
}
