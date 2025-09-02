import type { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import type { LoginForm } from '@app/auth/utils';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
import { hasAllRequiredProperties } from '@app/core/utils';
import { EMAIL_FIELD_VALIDATION, PASSWORD_FIELD_VALIDATION } from '@app/core/utils/constants';
import { DynamicFormComponent } from '@app/shared/components/dynamic-form/dynamic-form.component';
import type { FormConfig } from '@app/shared/models/form-config.model';
import { notMissing } from '@app/shared/utils';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ToasterMessageService, MessageService],
})
export class LoginComponent implements OnInit {
  readonly #authService: AuthService = inject(AuthService);
  readonly #router: Router = inject(Router);
  readonly #toasterMessageService: ToasterMessageService = inject(ToasterMessageService);

  loginFormConfig?: FormConfig<LoginForm>;

  ngOnInit(): void {
    if (this.#authService.isLoggedIn()) {
      this.#router.navigate(['/dashboard']);
      return;
    }

    this.loginFormConfig = {
      id: 'user-login',
      styleClass: 'flex flex-col justify-center gap-x-3 gap-y-3',
      responsive: true,
      fields: [
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
          label: 'Login',
          styleClass: 'p-button-primary',
          icon: 'pi pi-check',
        },
      ],
    };
  }

  onSubmit(loginFormData: unknown): void {
    if (notMissing(loginFormData)) {
      // Check if formData is an object and has all required fields
      if (
        typeof loginFormData !== 'object' ||
        !hasAllRequiredProperties<LoginForm>(loginFormData, ['email', 'password'])
      ) {
        this.#toasterMessageService.error({
          detail: 'Please fill in all required fields.',
          closable: false,
        });
        return;
      }

      this.#authService.login(loginFormData).subscribe({
        next: (response) => {
          if (
            response.success &&
            notMissing(response.data?.token) &&
            notMissing(response.data.user)
          ) {
            this.#authService.setAuthenticatedUser(response.data.token, response.data.user);

            this.#toasterMessageService.success({
              detail: response.message,
            });

            this.#router.navigate(['/dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.#toasterMessageService.error({
            detail: error.message,
            closable: false,
          });
        },
      });
    }
  }

  goToRegister() {
    this.#router.navigate(['/register']);
  }
}
