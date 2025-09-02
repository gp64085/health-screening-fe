import type { HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, inject, signal } from '@angular/core';
import { UserRole } from '@app/core/enums';
import type { ApiResponse } from '@app/core/interfaces/api-response';
import { ApiService } from '@app/core/services/api.service';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
import { jwtDecode } from 'jwt-decode';
import { type Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import type { User } from '../../core/interfaces/user';
import type { AuthResponse } from '../interfaces/auth-response';
import { type JwtTokenPayload, type LoginForm, TOKEN_KEY } from '../utils';
import { getToken, storeToken } from '../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #currentUserSignal = signal<User | null>(null);
  readonly #apiService: ApiService = inject(ApiService);
  readonly #toasterMessageService: ToasterMessageService = inject(ToasterMessageService);

  // Public signal for components to read
  public readonly currentUser = this.#currentUserSignal.asReadonly();

  // computed signals for role-based checks
  public readonly isLoggedIn = computed(() => !!this.currentUser());
  public readonly isAdmin = computed(() => this.#checkUserRole(UserRole.ADMIN));
  public readonly isUser = computed(() => this.#checkUserRole(UserRole.USER));

  constructor() {
    this.#loadStoredUser();
  }

  #loadStoredUser(): void {
    const token = getToken();
    if (!token) {
      return;
    }

    try {
      const decodedToken: JwtTokenPayload = jwtDecode(token);

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        this.logout();
        return;
      }

      // Set the current user from token data
      this.#currentUserSignal.set({
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
    return this.#apiService.post<LoginForm, AuthResponse>('auth/login', loginFormData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.#toasterMessageService.error({
          detail: error.message,
          closable: false,
        });
        return throwError(() => error);
      })
    );
  }

  register(userData: User): Observable<User> {
    return this.#apiService.post<User, AuthResponse>('auth/register', userData).pipe(
      tap((response) => {
        if (response.success) {
          this.setAuthenticatedUser(response.data.token, response.data.user);
          this.#toasterMessageService.success({
            detail: response.message,
          });
        }
      }),
      map((response) => response?.data?.user)
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.#currentUserSignal.set(null);
  }

  #checkUserRole(role: UserRole): boolean {
    const user = this.currentUser();
    return !!user && user.role === role;
  }

  #saveUser(user: User): void {
    this.#currentUserSignal.set(user);
  }

  setAuthenticatedUser(token: string, user: User): void {
    this.#saveUser(user);
    storeToken(token);
  }
}
