import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserRole } from '@app/core/enums';
import { AuthenticationError } from '@app/core/errors/authentication-error';
import { ApiResponse } from '@app/core/interfaces/api-response';
import { ApiService } from '@app/core/services/api.service';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, type Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import type { User } from '../../core/interfaces/user';
import type { AuthResponse } from '../interfaces/auth-response';
import { type IJwtPayload, type LoginForm, TOKEN_KEY } from '../utils';
import { getToken, storeToken } from '../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly apiService: ApiService = inject(ApiService);
  private readonly toasterMessageService: ToasterMessageService = inject(ToasterMessageService);

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = getToken();
    if (!token) {
      return;
    }

    try {
      const decodedToken: IJwtPayload = jwtDecode(token);

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        this.logout();
        return;
      }

      // Set the current user from token data
      this.currentUserSubject.next({
        id: decodedToken.sub,
        email: decodedToken.email ?? '',
        name: decodedToken.name ?? '',
        role: decodedToken.role,
      });
    } catch (error) {
      this.logout();
      console.error('Failed to decode token:', error);
    }
  }

  login(loginFormData: LoginForm): Observable<ApiResponse<AuthResponse>> {
    return this.apiService.post<LoginForm, AuthResponse>('auth/login', loginFormData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toasterMessageService.error({
          detail: error.message,
          closable: false,
        });
        return throwError(() => error);
      })
    );
  }
  private normalizeAuthError(error: HttpErrorResponse): AuthenticationError {
    if (error instanceof AuthenticationError) {
      return error;
    }
    return new AuthenticationError(
      error.error?.message || error.message || 'An unknown authentication error occurred'
    );
  }

  register(userData: User): Observable<User> {
    return this.apiService.post<User, AuthResponse>('auth/register', userData).pipe(
      tap((response) => {
        storeToken(response?.data?.token);
        this.currentUserSubject.next(response?.data?.user);
      }),
      map((response) => response?.data?.user)
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === UserRole.ADMIN;
  }

  isUser(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === UserRole.USER;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  saveUser(user: User): void {
    this.currentUserSubject.next(user);
  }
}
