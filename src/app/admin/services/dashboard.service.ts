import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@app/core/interfaces/api-response';
import { ApiService } from '@app/core/services/api.service';
import { Observable } from 'rxjs';
import { AdminDashboardUsersData } from '../interfaces/admin-dashboard-users-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly #apiService = inject(ApiService);

  getAdminDashbordUsersData(): Observable<ApiResponse<AdminDashboardUsersData>> {
    return this.#apiService.get('admin/dashboard/user-data');
  }
}
