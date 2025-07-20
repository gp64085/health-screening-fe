import type { HttpInterceptorFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { errorHandlingInterceptor } from './error-handling.interceptor';

describe('errorHandlingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorHandlingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
