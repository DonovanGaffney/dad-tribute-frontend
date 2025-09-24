import {Component, input, Input} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";

@Component({
    selector: 'app-text-area',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './text-area.component.html',
    styleUrl: './text-area.component.css'
})
export class TextAreaComponent {
  @Input() isPrimary: boolean = true;
  @Input() control: AbstractControl = new FormControl('');
  @Input() icon: string = '';
  @Input() clearable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() showingError: boolean = false
  @Input() errorText: string = '';
  @Input() isOptional: boolean = false;
  @Input() placeHolderText: string = '';
  @Input() helperText: string = '';
  @Input() maxLength: number | null = null;
  @Input() minLength: number | null = null;
  @Input() isPassword: boolean = false;
  @Input() id: string = uuidv4();
  rows = input<number>(5);

  currentType: string = 'text';

  ngOnInit(): void {
  }

  togglePassword() {
    if(this.currentType === 'password') {
      this.currentType = 'text';

    } else {
      this.currentType = 'password';
    }
  }

  get formControl() {
    return this.control as FormControl;
  }

  clearInput() {
    this.control.patchValue('');
  }

  protected readonly FormControl = FormControl;
}
