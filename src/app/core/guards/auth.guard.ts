import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.isLoggedIn()) {
    return true;
  }

  messageService.add({
    severity: 'warn',
    summary: 'Authentication Required',
    detail: 'Please log in to access this page',
    life: 5000,
  });

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
