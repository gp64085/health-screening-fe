import type { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Logs API requests and responses, including duration.
 * Useful for debugging.
 * @example
 * import { apiLoggingInterceptor } from './api-logging.interceptor';
 *
 * const http = new HttpClient([
 *   apiLoggingInterceptor,
 * ])
 */

export const apiLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  console.log(`API Request: ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: (_event) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(
          `API Response: ${req.method} ${req.url} completed in ${duration}ms`,
        );
      },
      error: (error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.error(
          `API Error: ${req.method} ${req.url} failed in ${duration}ms`,
          error,
        );
      },
    }),
  );
};
