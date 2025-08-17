import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { type Observable } from 'rxjs';
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
    return this.httpClient.patch<ApiResponse<T>>(`${environment.apiUrl}/${path}`, body, options);
  }
}
