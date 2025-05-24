import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MessageService } from 'primeng/api';

export const adminGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  messageService.add({
    severity: 'error',
    summary: 'Access Denied',
    detail: 'You do not have permission to access this page',
    life: 5000,
  });

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
  } else {
    router.navigate(['/dashboard']);
  }

  return false;
};
