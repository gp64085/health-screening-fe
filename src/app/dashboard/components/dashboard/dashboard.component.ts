import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardUsersData } from '@app/admin/interfaces/admin-dashboard-users-data';
import { DashboardService } from '@app/admin/services/dashboard.service';
import { AuthService } from '@app/auth/services/auth.service';
import { ToasterMessageService } from '@app/core/services/toaster-message.service';
import { StatCardComponent } from '@app/shared/components/stat-card/stat-card.component';
import { isMissing } from '@app/shared/utils';
import { ChartModule } from 'primeng/chart';

interface Dataset {
  data: number[];
  backgroundColor: string[];
}
interface ChartData {
  labels: string[];
  datasets: Dataset[];
  options?: [];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly #dashboardService = inject(DashboardService);
  readonly #toasterService = inject(ToasterMessageService);
  protected readonly currentUser = computed(() => this.#authService.currentUser());
  protected readonly isAdmin = computed(() => this.#authService.isAdmin());

  dashboardUsersResponse = signal<AdminDashboardUsersData | undefined>(undefined);

  pieData = computed<ChartData>(() => {
    if (this.dashboardUsersResponse()) {
      const labels = ['Active', 'Inactive', 'Deleted'];
      const datasets: Dataset[] = [];
      const data = [
        this.dashboardUsersResponse()?.activeUsers ?? 0,
        (this.dashboardUsersResponse()?.totalUsers ?? 0) -
          (this.dashboardUsersResponse()?.activeUsers ?? 0),
        this.dashboardUsersResponse()?.deletedUsers ?? 0,
      ];
      datasets.push({ data, backgroundColor: ['#2AA63E', '#800080', '#FF0000'] });
      return { labels, datasets };
    }
    return { labels: [], datasets: [] };
  });

  ngOnInit(): void {
    if (isMissing(this.currentUser)) {
      this.#router.navigate(['/login']);
    }
    this.loadDashboardData();
  }
  loadDashboardData(): void {
    if (this.#authService.isAdmin()) {
      this.#dashboardService.getAdminDashbordUsersData().subscribe({
        next: (response) => {
          if (response.success) {
            this.dashboardUsersResponse.set(response.data ?? {});
          }
        },
        error: (error: HttpErrorResponse) => {
          this.#toasterService.error({
            text: error.message ?? error,
          });
        },
      });
    }
  }
}
