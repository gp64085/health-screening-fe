import { UserResponse } from './user-response';

export interface AdminDashboardUsersData {
  users: UserResponse[];
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}
