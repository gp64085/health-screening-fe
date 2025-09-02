import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserRole } from '@app/core/enums';
import type { IMenuItem } from '@app/shared/models/menu-item.model';
import { notMissing } from '@app/shared/utils';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);

  protected currentRole: UserRole = UserRole.USER;
  protected readonly menuItems: IMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/dashboard',
      roles: [UserRole.ADMIN, UserRole.USER],
    },
    {
      label: 'Admin',
      icon: 'pi pi-shield',
      roles: [UserRole.ADMIN],
      expanded: false,
      children: [
        {
          label: 'Manage Users',
          icon: 'pi pi-users',
          route: '/admin/manage-users',
          roles: [UserRole.ADMIN],
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.initializeUserRole();
  }

  private initializeUserRole(): void {
    const user = this.#authService.currentUser();
    if (this.#authService.isLoggedIn() && notMissing(user)) {
      this.currentRole = user?.role ?? UserRole.USER;
    } else {
      console.error('Error in fetching user role');
      this.handleAuthError();
    }
  }

  private handleAuthError(): void {
    this.#router.navigate(['/login']);
  }
}
