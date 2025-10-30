import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, type OnInit, output } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
import type {
  FormButtonConfig,
  FormConfig,
  FormFieldConfig,
} from '@app/shared/models/form-config.model';
import { isMissing, notMissing } from '@app/shared/utils';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dynamic-form',
  imports: [
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
  config = input.required<T>();
  formSubmit = output<unknown>();
  private readonly messageService = inject(ToasterMessageService);
  private readonly formBuilder = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    if (isMissing(this.config())) {
      this.messageService.error({
        detail: 'Form configuration is required',
      });
    }
    this.buildForm();
  }

  private buildForm(): void {
    this.config().fields.forEach((field) => {
      this.form.addControl(
        field.name,
        this.formBuilder.control(
          field.value ?? null, // Handle value conversion
          this.getValidators(field)
        )
      );

      // Set disabled state if needed
      if (field.disabled) {
        this.form.get(field.name)?.disable();
      }
    });

    // 4. Apply initial data if provided
    if (notMissing(this.config()?.initialData)) {
      this.form.patchValue(this.config().initialData ?? {}, { emitEvent: false });
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
        if (Array.isArray(field.validation.pattern)) {
          field.validation.pattern.forEach((pattern) => {
            validators.push(Validators.pattern(pattern.value));
          });
        } else {
          validators.push(Validators.pattern(field.validation.pattern?.value));
        }
      }

      if (notMissing(field.validation?.email)) {
        validators.push(Validators.email);
      }

      // TODO: implement custom validator
    }
    return validators;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.config()?.fields.find((f) => f.name === fieldName);

    if (isMissing(field?.validation)) {
      return '';
    }

    const control = this.form.get(fieldName);

    if (isMissing(control?.errors)) {
      return '';
    }

    for (const errorKey in control?.errors) {
      if (control.errors?.hasOwnProperty(errorKey)) {
        switch (errorKey) {
          case 'required':
            return this.getRequiredError(field);
          case 'minlength':
            return this.getMinLengthError(field);
          case 'maxlength':
            return this.getMaxLengthError(field);
          case 'pattern':
            return this.getPatternErrorMessage(field, control?.value);
          case 'email':
            return this.getEmailError(field);
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
      if (this.config()?.autoReset === true) {
        this.form.reset();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
  getPatternErrorMessage(
    field: FormFieldConfig<unknown> | undefined,
    value: string | undefined
  ): string {
    // Handle array of patterns
    if (Array.isArray(field?.validation?.pattern)) {
      const failedPattern = field.validation.pattern?.find((p) => !p.value.test(value ?? ''));
      return failedPattern?.message || 'Invalid format';
    }

    // Handle single pattern with custom message
    if (field?.validation?.pattern?.message) {
      return field.validation.pattern?.message;
    }

    return 'Invalid format';
  }

  getMaxLengthError(field: FormFieldConfig<unknown> | undefined): string {
    const max =
      typeof field?.validation?.maxLength === 'number'
        ? field.validation.maxLength
        : field?.validation?.maxLength?.value;

    return field?.validation?.maxLength && typeof field?.validation?.maxLength !== 'number'
      ? field.validation.maxLength.message
      : `Maximum length is ${max}`;
  }

  getMinLengthError(field: FormFieldConfig<unknown> | undefined): string {
    const min =
      typeof field?.validation?.minLength === 'number'
        ? field.validation.minLength
        : field?.validation?.minLength?.value;

    return field?.validation?.minLength && typeof field?.validation?.minLength !== 'number'
      ? field.validation.minLength.message
      : `Minimum length is ${min}`;
  }

  getEmailError(field: FormFieldConfig<unknown> | undefined): string {
    return typeof field?.validation?.email === 'string'
      ? field.validation.email
      : 'Please enter a valid email address';
  }

  getRequiredError(field: FormFieldConfig<unknown> | undefined): string {
    return typeof field?.validation?.required === 'string'
      ? field.validation.required
      : 'This field is required';
  }

  trackByCompositeKey(index: number, formField: FormFieldConfig<unknown> | FormButtonConfig) {
    return `${formField.label}_${index}`;
  }
}
