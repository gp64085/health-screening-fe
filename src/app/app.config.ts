import {
  ApplicationConfig,
  provideZoneChangeDetection,
  ErrorHandler,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { apiLoggingInterceptor } from './core/interceptors/api-logging.interceptor';
import { errorHandlingInterceptor } from './core/interceptors/error-handling.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
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
