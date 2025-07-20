import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import type { UserRegistrationForm } from '@app/auth/utils';
import {
  EMAIL_REGEX,
  MOBILE_REGEX,
  PASSWORD_REGEX,
} from '@app/core/utils/constants';
import { DynamicFormComponent } from '@app/shared/components/dynamic-form/dynamic-form.component';
import { notMissing } from '@app/shared/utils';
import type { FormConfig } from '@app/shared/utils/form-config.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

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
        validation: {
          required: '*Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Please enter a valid email address',
          },
        },
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        validation: {
          required: 'Password is required',
          pattern: {
            value: PASSWORD_REGEX,
            message:
              'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
          },
        },
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

  onFormSubmit(formData: Record<string, unknown>): void {
    if (notMissing(formData)) {
      // Convert formData to UserRegistrationForm type
      const userData = formData as unknown as UserRegistrationForm;
      this.authService
        .register({
          email: userData?.email ?? '',
          name: userData?.firstName + ' ' + userData?.lastName,
          password: userData?.password ?? '',
        })
        .subscribe({
          next: (user) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed:', error);
          },
        });
    }
  }
}
