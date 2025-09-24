import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {v4 as uuidv4} from "uuid";

@Component({
    selector: 'app-input',
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgClass,
        NgxMaskDirective
    ],
    providers: [provideNgxMask()],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css'
})
export class InputComponent implements OnInit{
  @Input() isPrimary: boolean = true;
  @Input() control: AbstractControl = new FormControl<string>('');
  @Input() icon: string = '';
  @Input() clearable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() showingError: boolean = false
  @Input() errorText: string = '';
  @Input() isOptional: boolean = false;
  @Input() placeHolderText: string = '';
  @Input() helperText: string = '';
  @Input() inputMask: string = '';
  @Input() prefix: string = '';
  @Input() maskSuffix: string = '';
  @Input() thousandSeparator: string = '';
  @Input() max: number | null = null;
  @Input() min: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() minLength: number | null = null;
  @Input() isPassword: boolean = false;

  @Input() type: 'text' | 'number' | 'password' | 'date' | 'email' | 'checkbox' | 'datetime-local' | 'tel' = 'text';
  @Input() id: string = uuidv4();

  currentType: string = 'text';

  ngOnInit(): void {
    if (this.isPassword) {
      this.currentType = 'password'
    } else {
      this.currentType = this.type;
    }
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
