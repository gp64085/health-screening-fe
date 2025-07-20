import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  type ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { apiLoggingInterceptor } from './core/interceptors/api-logging.interceptor';
import { errorHandlingInterceptor } from './core/interceptors/error-handling.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(
      withInterceptors([
        apiLoggingInterceptor,
        errorHandlingInterceptor,
        jwtInterceptor,
      ])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    MessageService,
  ],
};
