import type { HttpInterceptorFn } from '@angular/common/http';
import { getToken } from '@app/auth/utils/storage';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getToken();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
