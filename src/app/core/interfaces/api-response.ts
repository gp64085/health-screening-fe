export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string; // Optional field for error messages
  statusCode?: number; // Optional field for HTTP status codes
  timestamp?: string; // Optional field for the response timestamp
}
