import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import type { LoginForm } from '@app/auth/utils';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@app/core/utils/constants';
import { DynamicFormComponent } from '@app/shared/components/dynamic-form/dynamic-form.component';
import { notMissing } from '@app/shared/utils';
import type { FormConfig } from '@app/shared/utils/form-config.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    if (notMissing(this.authService.getCurrentUser())) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginFormConfig: FormConfig<LoginForm> = {
    id: 'user-login',
    styleClass: 'flex flex-col justify-center gap-x-3 gap-y-3',
    responsive: true,
    fields: [
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
          required: '*Password is required',
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
        label: 'Login',
        styleClass: 'p-button-primary',
        icon: 'pi pi-check',
      },
    ],
  };

  onSubmit(formData: Record<string, unknown>): void {
    if (notMissing(formData)) {
      const loginData: LoginForm = {
        email: formData['email'] as string,
        password: formData['password'] as string,
      };

      this.authService.login(loginData).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (error) => {
          console.error('Login failed:', error);
          // TODO: Show user-friendly error message
        },
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
