import { User } from '../../core/interfaces/user';

export interface AuthResponse {
  token: string;
  user: User;
}
