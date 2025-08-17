import { Injectable, inject } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterMessageService {
  private readonly messageService: MessageService = inject(MessageService);
  success(options: Omit<ToastMessageOptions, 'severity'>): void {
    this.messageService.add({
      severity: 'success',
      summary: options.summary || 'Success',
      detail: options.detail,
      life: 3000,
      closable: options.closable,
    });
  }

  error(options: Omit<ToastMessageOptions, 'severity'>): void {
    this.messageService.add({
      severity: 'error',
      summary: options.summary || 'Error',
      detail: options.detail,
      life: 3000,
      closable: options.closable,
      icon: options?.icon,
    });
  }

  info(options: Omit<ToastMessageOptions, 'severity'>): void {
    this.messageService.add({
      severity: 'info',
      summary: options.summary || 'Info',
      detail: options.detail,
      life: 3000,
    });
  }
}
