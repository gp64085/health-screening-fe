import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { ApiResponse } from '@app/core/interfaces/api-response';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, type Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type { User } from '../../core/interfaces/user';
import type { AuthResponse } from '../interfaces/auth-response';
import type { IJwtPayload, LoginForm } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private readonly http: HttpClient = inject(HttpClient);

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = this.getToken();
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
        // role: decodedToken.role ,
      });
    } catch (error) {
      this.logout();
      console.error('Failed to decode token:', error);
    }
  }

  login(loginFormData: LoginForm): Observable<User> {
    return this.http
      .post<ApiResponse<AuthResponse>>(
        `${environment.apiUrl}/auth/login`,
        loginFormData,
      )
      .pipe(
        tap((response) => {
          this.storeToken(response?.data?.token);
          this.currentUserSubject.next(response?.data.user);
        }),
        map((response) => response?.data?.user),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                `Login failed: ${error.error?.message || 'Unknown error'}`,
              ),
          );
        }),
      );
  }

  loginWithMobileAndDob(mobile: string, dob: string): Observable<User> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login-mobile`, {
        mobile,
        dob,
      })
      .pipe(
        tap((response) => {
          this.storeToken(response.token);
          this.currentUserSubject.next(response.user);
        }),
        map((response) => response.user),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                `Login failed: ${error.error?.message || 'Unknown error'}`,
              ),
          );
        }),
      );
  }

  register(userData: User): Observable<User> {
    return this.http
      .post<ApiResponse<AuthResponse>>(
        `${environment.apiUrl}/auth/register`,
        userData,
      )
      .pipe(
        tap((response) => {
          this.storeToken(response?.data?.token);
          this.currentUserSubject.next(response?.data?.user);
        }),
        map((response) => response?.data?.user),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                `Registration failed: ${error.error?.message || 'Unknown error'}`,
              ),
          );
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === 'ADMIN';
  }

  isUser(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === 'USER';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  refreshToken(): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, {})
      .pipe(
        tap((response) => {
          this.storeToken(response.token);
          this.currentUserSubject.next(response.user);
        }),
        map(() => true),
        catchError(() => {
          this.logout();
          return of(false);
        }),
      );
  }
}
