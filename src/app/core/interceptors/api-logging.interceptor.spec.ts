import type { HttpInterceptorFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { apiLoggingInterceptor } from './api-logging.interceptor';

describe('apiLoggingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiLoggingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
