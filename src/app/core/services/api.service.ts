import { HttpClient, type HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from '@app/auth/utils';
import { deleteStorageByKey } from '@app/auth/utils/storage';
import { environment } from '@env/environment';
import { catchError, type Observable, throwError } from 'rxjs';
import type { ApiResponse } from '../interfaces/api-response';
import type { IApiOptions } from '../interfaces/iapi-options';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router = inject(Router);

  /**
   * Performs an HTTP GET request to the specified path with optional API options
   * and returns an Observable of the response wrapped in ApiResponse<T>.
   *
   * @param {string} path - The path to send the HTTP GET request to.
   * @param {IApiOptions} [options] - The optional API options to include in the request.
   * @return {Observable<ApiResponse<T>>} - An Observable of the response wrapped in ApiResponse<T>.
   */
  get<T>(path: string, options?: IApiOptions): Observable<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(`${environment.apiUrl}/${path}`, options);
  }

  /**
   * Performs an HTTP POST request to the specified path with the given body and
   * optional API options and returns an Observable of the response wrapped in
   * ApiResponse<T>.
   *
   * @param {string} path - The path to send the HTTP POST request to.
   * @param {P} body - The body of the HTTP POST request.
   * @param {IApiOptions} [options] - The optional API options to include in the request.
   * @return {Observable<ApiResponse<T>>} - An Observable of the response wrapped in ApiResponse<T>.
   */
  post<P, T>(path: string, body: P, options?: IApiOptions): Observable<ApiResponse<T>> {
    return this.httpClient.post<ApiResponse<T>>(`${environment.apiUrl}/${path}`, body, options);
  }

  /**
   * Performs an HTTP PUT request to the specified path with the given body and
   * optional API options and returns an Observable of the response wrapped in
   * ApiResponse<T>.
   *
   * @param {string} path - The path to send the HTTP PUT request to.
   * @param {P} body - The body of the HTTP PUT request.
   * @param {IApiOptions} [options] - The optional API options to include in the request.
   * @return {Observable<ApiResponse<T>>} - An Observable of the response wrapped in ApiResponse<T>.
   */
  put<P, T>(path: string, body: P, options?: IApiOptions): Observable<ApiResponse<T>> {
    return this.httpClient.put<ApiResponse<T>>(`${environment.apiUrl}/${path}`, body, options);
  }

  /**
   * Performs an HTTP DELETE request to the specified path with optional API options
   * and returns an Observable of the response wrapped in ApiResponse<T>.
   *
   * @param {string} path - The path to send the HTTP DELETE request to.
   * @param {IApiOptions} [options] - The optional API options to include in the request.
   * @return {Observable<ApiResponse<T>>} - An Observable of the response wrapped in ApiResponse<T>.
   */
  delete<T>(path: string, options?: IApiOptions): Observable<ApiResponse<T>> {
    return this.httpClient.delete<ApiResponse<T>>(`${environment.apiUrl}/${path}`, options);
  }

  /**
   * Performs an HTTP PATCH request to the specified path with the given body and
   * optional API options and returns an Observable of the response wrapped in
   * ApiResponse<T>.
   *
   * @param {string} path - The path to send the HTTP PATCH request to.
   * @param {P} body - The body of the HTTP PATCH request.
   * @param {IApiOptions} [options] - The optional API options to include in the request.
   * @return {Observable<ApiResponse<T>>} - An Observable of the response wrapped in ApiResponse<T>.
   */
  patch<P, T>(path: string, body: P, options?: IApiOptions): Observable<ApiResponse<T>> {
    return this.httpClient
      .patch<ApiResponse<T>>(`${environment.apiUrl}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles the HTTP error response by extracting the error message and
   * throwing an error observable. The error message is extracted from the
   * error instance if it is an instance of ErrorEvent, otherwise it is extracted
   * from the error status. The error message is then logged to the console and
   * an error observable is thrown. If the error status is 401, the user is
   * logged out and redirected to the login page.
   *
   * @param {HttpErrorResponse} error - The HTTP error response.
   * @return {Observable<never>} An error observable.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    // Client-side error
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Error 400: Bad Request';
          break;
        case 401:
          errorMessage = 'Error 401: Unauthorized';
          deleteStorageByKey(TOKEN_KEY);
          this.router.navigate(['/login']);
          break;
        case 404:
          errorMessage = 'Error 404: Not Found';
          break;
        case 500:
          errorMessage = 'Error 500: Internal Server Error';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error(errorMessage);
    throw throwError(() => new Error(errorMessage));
  }
}
