import type { UserRole } from '@app/core/types';
import type { JwtPayload } from 'jwt-decode';

export interface IJwtPayload extends JwtPayload {
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
