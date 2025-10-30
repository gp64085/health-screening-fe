import type { UserRole } from '../enums';
import { Role } from './role';

export interface User {
  id?: string;
  email: string;
  name: string;
  mobile?: string;
  role?: UserRole | Role;
  password?: string;
}
