import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { type UserRegistrationForm } from '@app/auth/utils';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
import { hasAllRequiredProperties } from '@app/core/utils';
import {
  EMAIL_FIELD_VALIDATION,
  MOBILE_REGEX,
  PASSWORD_FIELD_VALIDATION,
} from '@app/core/utils/constants';
import { DynamicFormComponent } from '@app/shared/components/dynamic-form/dynamic-form.component';
import type { FormConfig } from '@app/shared/models/form-config.model';
import { notMissing } from '@app/shared/utils';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DynamicFormComponent, Toast],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly toasterMessageService: ToasterMessageService = inject(ToasterMessageService);

  registrationFormConfig: FormConfig<UserRegistrationForm> = {
    id: 'user-registration',
    styleClass: 'flex flex-col justify-center gap-x-3 gap-y-3',
    responsive: true,
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'inputText',
        placeholder: 'Enter your first name',
        validation: { required: '*First name is required' },
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'inputText',
        placeholder: 'Enter your last name',
        validation: { required: '*Last name is required' },
      },
      {
        name: 'mobile',
        label: 'Mobile Number',
        type: 'inputText',
        placeholder: 'Enter your mobile number',
        validation: {
          required: '*Mobile number is required',
          pattern: {
            value: MOBILE_REGEX,
            message: 'Please enter a valid 10-digit mobile number',
          },
        },
      },
      {
        name: 'email',
        label: 'Email',
        type: 'inputText',
        placeholder: 'Enter your email',
        validation: EMAIL_FIELD_VALIDATION,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        validation: PASSWORD_FIELD_VALIDATION,
      },
    ],
    buttons: [
      {
        type: 'submit',
        label: 'Register',
        styleClass: 'p-button-primary',
        icon: 'pi pi-check',
      },
    ],
  };

  onFormSubmit(formData: unknown): void {
    if (notMissing(formData)) {
      if (
        typeof formData !== 'object' ||
        !hasAllRequiredProperties<UserRegistrationForm>(formData, [
          'firstName',
          'lastName',
          'email',
          'password',
        ])
      ) {
        this.toasterMessageService.error({
          detail: 'Please fill in all required fields.',
          closable: false,
        });
        return;
      }

      this.authService
        .register({
          email: formData?.email ?? '',
          name: `${formData?.firstName} ${formData?.lastName}`,
          password: formData?.password ?? '',
        })
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: (error) => {
            console.error('Registration failed:', error);
          },
        });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
