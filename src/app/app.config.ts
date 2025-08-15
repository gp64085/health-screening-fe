import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
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
        options: {
          darkModeSelector: '.app-dark-mode',
        },
      },
    }),
    provideHttpClient(
      withInterceptors([apiLoggingInterceptor, errorHandlingInterceptor, jwtInterceptor])
    ),
    MessageService,
  ],
};
