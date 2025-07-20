import { inject } from '@angular/core';
import {
  type ActivatedRouteSnapshot,
  type CanActivateFn,
  Router,
  type RouterStateSnapshot,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  console.log(
    `adminGuard: Checking if user is admin. User: ${authService.getCurrentUser()?.email} is trying to access ${route.data?.['title']}`,
  );

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
