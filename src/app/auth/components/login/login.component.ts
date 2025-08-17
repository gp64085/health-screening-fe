import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import type { LoginForm } from '@app/auth/utils';
import { storeToken } from '@app/auth/utils/storage';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
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
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly toasterMessageService: ToasterMessageService = inject(ToasterMessageService);

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

  onSubmit(formData: Record<string, unknown>): void {
    if (notMissing(formData)) {
      const loginData: LoginForm = {
        // biome-ignore lint/complexity/useLiteralKeys: Required to access form data
        email: formData['email'] as string,
        // biome-ignore lint/complexity/useLiteralKeys: Required to access form data
        password: formData['password'] as string,
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          if (response.success) {
            storeToken(response?.data?.token);
            this.authService.saveUser(response.data?.user);

            this.toasterMessageService.success({
              detail: response.message,
            });

            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.toasterMessageService.error({
            detail: error.message,
            closable: false,
          });
        },
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
