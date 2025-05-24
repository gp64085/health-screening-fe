import { UserRole } from '../types';

export interface User {
  id?: string;
  email: string;
  fullName: string;
  role: UserRole;
}
