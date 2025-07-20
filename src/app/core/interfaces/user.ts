import type { UserRole } from '../enums';

export interface User {
  id?: string;
  email: string;
  name: string;
  mobile?: string;
  role?: UserRole;
  password?: string;
}
