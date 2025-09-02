import type { UserRole } from '@app/core/enums';
import type { JwtPayload } from 'jwt-decode';

export const TOKEN_KEY = 'auth_token';

export interface JwtTokenPayload extends JwtPayload {
  email?: string;
  name?: string;
  role?: UserRole;
}

export interface UserRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
