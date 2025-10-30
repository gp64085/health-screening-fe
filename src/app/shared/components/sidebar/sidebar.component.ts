import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserRole } from '@app/core/enums';
import type { NavigationMenuItem } from '@app/shared/models/navigation-menu-item.model';
import { MenuService } from '@app/shared/services/menu.service';
import { notMissing } from '@app/shared/utils';
import { PrimeIcons } from 'primeng/api';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarItemComponent, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);
  protected readonly menuService = inject(MenuService);
  protected currentRole: UserRole = UserRole.USER;

  protected readonly menuItems: NavigationMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/dashboard',
      roles: [UserRole.ADMIN, UserRole.USER],
    },
    {
      label: 'Admin',
      icon: PrimeIcons.SHIELD,
      roles: [UserRole.ADMIN],
      expanded: false,
      children: [
        {
          label: 'Manage Users',
          icon: PrimeIcons.USERS,
          route: '/admin/manage-users',
          roles: [UserRole.ADMIN],
        },
      ],
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      route: '/login',
      roles: [UserRole.ADMIN, UserRole.USER],
      click: () => this.#authService.logout(),
    },
  ];

  ngOnInit(): void {
    this.initializeUserRole();
  }

  private initializeUserRole(): void {
    const user = this.#authService.currentUser();
    if (this.#authService.isLoggedIn() && notMissing(user)) {
      this.currentRole =
        (typeof user.role === 'object' ? user?.role?.name : user?.role) ?? UserRole.USER;
    } else {
      console.error('Error in fetching user role');
      this.handleAuthError();
    }
  }

  private handleAuthError(): void {
    this.#router.navigate(['/login']);
  }
}
