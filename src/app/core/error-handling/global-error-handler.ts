import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private messageService: MessageService,
    private zone: NgZone,
  ) {}

  handleError(error: HttpErrorResponse): void {
    // Log the error to console
    console.error('Global error handler caught an error:', error.message);

    // Use NgZone to ensure UI updates correctly
    this.zone.run(() => {
      // Display user-friendly error message
      this.messageService.add({
        severity: 'error',
        summary: 'Application Error',
        detail:
          'Something went wrong. Please try again or contact support if the issue persists.',
        life: 5000,
      });
    });
  }
}
