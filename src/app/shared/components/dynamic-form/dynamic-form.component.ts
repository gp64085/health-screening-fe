import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  type OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import { isMissing, notMissing } from '@app/shared/utils';
import {
  type FormConfig,
  type FormFieldConfig,
} from '@app/shared/utils/form-config.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    CheckboxModule,
    ButtonModule,
    FloatLabel,
    PasswordModule,
    TitleCasePipe,
  ],
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent<T extends FormConfig> implements OnInit {
  @Input() config!: T;
  @Output() formSubmit = new EventEmitter<
    Record<string, string | number | boolean | Date>
  >();

  form: FormGroup;
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    if (isMissing(this.config)) {
      throw new Error('Form configuration is required');
    }
    this.buildForm();
  }
  private buildForm(): void {
    this.config.fields.forEach((field) => {
      this.form.addControl(
        field.name,
        this.formBuilder.control(
          field.value ?? null, // Handle value conversion
          this.getValidators(field),
        ),
      );

      // Set disabled state if needed
      if (field.disabled) {
        this.form.get(field.name)?.disable();
      }
    });

    // 4. Apply initial data if provided
    if (this.config.initialData) {
      this.form.patchValue(this.config.initialData, { emitEvent: false });
    }
  }
  getValidators(field: FormFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.validation) {
      if (notMissing(field.validation.required)) {
        validators.push(Validators.required);
      }

      if (notMissing(field.validation.minLength)) {
        const minLength =
          typeof field.validation.minLength === 'number'
            ? field.validation?.minLength
            : field.validation.minLength?.value;
        validators.push(Validators.minLength(minLength));
      }

      if (notMissing(field.validation.maxLength)) {
        const maxLength =
          typeof field.validation.maxLength === 'number'
            ? field.validation?.maxLength
            : field.validation.maxLength?.value;
        validators.push(Validators.maxLength(maxLength));
      }

      if (notMissing(field.validation.pattern)) {
        validators.push(Validators.pattern(field.validation.pattern?.value));
      }

      if (notMissing(field.validation?.email)) {
        validators.push(Validators.email);
      }

      // TODO: implement custom validator
      // if (notMissing(field.validation.custom)) {
      // }
    }
    return validators;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.config.fields.find((f) => f.name === fieldName);

    if (isMissing(field?.validation)) return '';

    const control = this.form.get(fieldName);

    if (isMissing(control?.errors)) return '';

    for (const errorKey in control?.errors) {
      if (control.errors?.hasOwnProperty(errorKey)) {
        switch (errorKey) {
          case 'required':
            return typeof field?.validation?.required === 'string'
              ? field?.validation?.required
              : 'This field is required';
          case 'minlength': {
            const min =
              typeof field?.validation?.minLength === 'number'
                ? field.validation?.minLength
                : field?.validation?.minLength?.value;
            return field?.validation?.minLength &&
              typeof field?.validation?.minLength !== 'number'
              ? field?.validation?.minLength.message
              : `Minimum length is ${min}`;
          }
          case 'maxlength': {
            const max =
              typeof field?.validation?.maxLength === 'number'
                ? field?.validation?.maxLength
                : field?.validation?.maxLength?.value;
            return field?.validation?.maxLength &&
              typeof field?.validation?.maxLength !== 'number'
              ? field.validation.maxLength.message
              : `Maximum length is ${max}`;
          }
          case 'pattern':
            return field?.validation?.pattern?.message ?? 'Invalid format';
          case 'email':
            return typeof field?.validation?.email === 'string'
              ? field.validation.email
              : 'Please enter a valid email address';
          default:
            return field?.validation?.custom?.message ?? 'Invalid value';
        }
      }
    }

    return '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      if (notMissing(this.config.autoReset) && this.config.autoReset === true) {
        this.form.reset();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
